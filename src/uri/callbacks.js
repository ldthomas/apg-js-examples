/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// no reporting of specific errors
// force parsing failure on semantic errors
// user will need to trace(debug) the parse tree to find parsing errors

const { apgLib } = require('apg-js');
const ids = apgLib.ids;
const utils = apgLib.utils;

function setUriElement(data, key, value) {
  if (data && data.uriElements) {
    data.uriElements[key] = value;
  }
}

const cb = {
  URI(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      data.uri = utils.charsToString(chars, phraseIndex, result.phraseLength);
    } else if (result.state === ids.EMPTY) {
      result.state = ids.NOMATCH;
      result.phraseLength = 0;
    }
  },

  scheme(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'scheme', utils.charsToString(chars, phraseIndex, result.phraseLength));
    }
  },

  userinfoAt(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'userinfo', utils.charsToString(chars, phraseIndex, result.phraseLength - 1));
    }
  },

  host(result, chars, phraseIndex, data) {
    if (result.state === ids.ACTIVE) {
      data.iplit = false;
    } else if (result.state === ids.MATCH) {
      if (data.iplit) {
        setUriElement(data, 'host', utils.charsToString(chars, phraseIndex + 1, result.phraseLength - 2));
      } else {
        setUriElement(data, 'host', utils.charsToString(chars, phraseIndex, result.phraseLength));
      }
    } else if (result.state === ids.EMPTY) {
      setUriElement(data, 'host', '');
    }
  },

  ipLiteral(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      data.iplit = true;
    }
  },

  port(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      const portStr = utils.charsToString(chars, phraseIndex, result.phraseLength);
      const parsed = parseInt(portStr, 10);
      if (Number.isNaN(parsed)) {
        result.state = ids.NOMATCH;
        result.phraseLength = 0;
      } else {
        setUriElement(data, 'port', parsed);
      }
    } else if (result.state === ids.EMPTY) {
      setUriElement(data, 'port', '');
    }
  },

  pathAbempty(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, result.phraseLength));
    } else if (result.state === ids.EMPTY) {
      setUriElement(data, 'path', '');
    }
  },

  pathAbsolute(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, result.phraseLength));
    }
  },

  pathRootless(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, result.phraseLength));
    }
  },

  pathEmpty(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH || result.state === ids.NOMATCH) {
      result.state = ids.NOMATCH;
      result.phraseLength = 0;
    }
    if (result.state === ids.EMPTY) {
      setUriElement(data, 'path', '');
    }
  },

  query(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'query', utils.charsToString(chars, phraseIndex, result.phraseLength));
    } else if (result.state === ids.EMPTY) {
      setUriElement(data, 'query', '');
    }
  },

  fragment(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      setUriElement(data, 'fragment', utils.charsToString(chars, phraseIndex, result.phraseLength));
    } else if (result.state === ids.EMPTY) {
      setUriElement(data, 'fragment', '');
    }
  },

  ipv4(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      data.ipv4 = true;
    }
  },

  h16(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      data.h16count += 1;
    }
  },

  nodcolon(result, chars, phraseIndex, data) {
    if (result.state === ids.ACTIVE) {
      data.h16count = 0;
      data.ipv4 = false;
    } else if (result.state === ids.MATCH) {
      // semantically validate the number of 16-bit digits
      if (data.ipv4 ? data.h16count === 6 : data.h16count === 8) {
        result.state = ids.MATCH;
      } else {
        result.state = ids.NOMATCH;
        result.phraseLength = 0;
      }
    }
  },

  dcolon(result, chars, phraseIndex, data) {
    if (result.state === ids.ACTIVE) {
      data.h16count = 0;
      data.ipv4 = false;
    } else if (result.state === ids.MATCH) {
      // semantically validate the number of 16-bit digits
      if (data.ipv4 ? data.h16count < 6 : data.h16count < 8) {
        result.state = ids.MATCH;
      } else {
        result.state = ids.NOMATCH;
        result.phraseLength = 0;
      }
    }
  },

  decOctet(result, chars, phraseIndex, data) {
    if (result.state === ids.ACTIVE) {
      data.octet = 0;
    } else if (result.state === ids.MATCH) {
      // semantically validate the octet
      if (data.octet > 255) {
        result.state = ids.NOMATCH;
        result.phraseLength = 0;
      }
    }
  },

  decDigit(result, chars, phraseIndex, data) {
    if (result.state === ids.MATCH) {
      data.octet = 10 * data.octet + chars[phraseIndex] - 48;
    }
  },
};

module.exports = cb;
