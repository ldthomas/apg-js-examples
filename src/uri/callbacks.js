/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// These are the callback functions used by the URI parser.
// There is no reporting of specific errors.
// Any error will simply force the parser to fail.
// The user will need to trace(debug) the parse tree to find parsing errors

const { apgLib } = require('apg-js');
const ids = apgLib.ids;
const utils = apgLib.utils;

function setUriElement(data, key, value) {
  if (data && data.uriElements) {
    data.uriElements[key] = value;
  }
}

const cb = {
  // The start rule for the URI parser.
  // It simply collects the URI string on success and fails if the input string is empty.
  URI(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      data.uri = utils.charsToString(chars, phraseIndex, sys.phraseLength);
    } else if (sys.state === ids.EMPTY) {
      sys.state = ids.NOMATCH;
      sys.phraseLength = 0;
    }
  },
  // Collect the URI scheme.
  scheme(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'scheme', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    }
  },
  // Match <code>userinfo@</code> but reduce the phrase length to exclude the <code>@</code>.
  userinfoAt(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'userinfo', utils.charsToString(chars, phraseIndex, sys.phraseLength - 1));
    }
  },
  // Collect the host name. If it is an <code>IP-literal</code>, remove the leading <code>[</code> and trailing <code>]</code>.
  host(sys, chars, phraseIndex, data) {
    if (sys.state === ids.ACTIVE) {
      data.iplit = false;
    } else if (sys.state === ids.MATCH) {
      if (data.iplit) {
        setUriElement(data, 'host', utils.charsToString(chars, phraseIndex + 1, sys.phraseLength - 2));
      } else {
        setUriElement(data, 'host', utils.charsToString(chars, phraseIndex, sys.phraseLength));
      }
    } else if (sys.state === ids.EMPTY) {
      setUriElement(data, 'host', '');
    }
  },
  // If this is an <code>IP-literal</code>, set the flag.
  ipLiteral(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      data.iplit = true;
    }
  },
  // Collect the port number.
  // If it is a number, convert the string to a number.
  // If it is empty, set the port to ''.
  port(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      const portStr = utils.charsToString(chars, phraseIndex, sys.phraseLength);
      const parsed = parseInt(portStr, 10);
      if (Number.isNaN(parsed)) {
        sys.state = ids.NOMATCH;
        sys.phraseLength = 0;
      } else {
        setUriElement(data, 'port', parsed);
      }
    } else if (sys.state === ids.EMPTY) {
      setUriElement(data, 'port', '');
    }
  },

  // The followng four rules are used to collect the path.
  pathAbempty(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    } else if (sys.state === ids.EMPTY) {
      setUriElement(data, 'path', '');
    }
  },
  pathAbsolute(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    }
  },

  pathRootless(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'path', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    }
  },

  pathEmpty(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH || sys.state === ids.NOMATCH) {
      sys.state = ids.NOMATCH;
      sys.phraseLength = 0;
    }
    if (sys.state === ids.EMPTY) {
      setUriElement(data, 'path', '');
    }
  },
  // Get the query string.
  query(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'query', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    } else if (sys.state === ids.EMPTY) {
      setUriElement(data, 'query', '');
    }
  },
  // Get the fragment string.
  fragment(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      setUriElement(data, 'fragment', utils.charsToString(chars, phraseIndex, sys.phraseLength));
    } else if (sys.state === ids.EMPTY) {
      setUriElement(data, 'fragment', '');
    }
  },
  // If this is an <code>IPv4</code> address, set the flag.
  ipv4(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      data.ipv4 = true;
      console.log('ipv4: match');
    }
  },
  // Count the number of 16-bit hex digits.
  h16(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      data.h16count += 1;
    }
  },
  // Collect the <code>IPv6</code> address if in does not contain a double colon.
  // Semantically validate the number of 16-bit digits.
  nodcolon(sys, chars, phraseIndex, data) {
    if (sys.state === ids.ACTIVE) {
      data.h16count = 0;
      data.ipv4 = false;
    } else if (sys.state === ids.MATCH) {
      if (data.ipv4 ? data.h16count === 6 : data.h16count === 8) {
        sys.state = ids.MATCH;
      } else {
        sys.state = ids.NOMATCH;
        sys.phraseLength = 0;
      }
    }
  },
  // Collect the <code>IPv6</code> address if in does contains a double colon.
  // Semantically validate the number of 16-bit digits.
  dcolon(sys, chars, phraseIndex, data) {
    if (sys.state === ids.ACTIVE) {
      data.h16count = 0;
      data.ipv4 = false;
    } else if (sys.state === ids.MATCH) {
      if (data.ipv4 ? data.h16count < 6 : data.h16count < 8) {
        sys.state = ids.MATCH;
      } else {
        sys.state = ids.NOMATCH;
        sys.phraseLength = 0;
      }
    }
  },
  // Collect the decimal octet and validate it semantically.
  // The octet is a number between 0 and 255.
  decOctet(sys, chars, phraseIndex, data) {
    if (sys.state === ids.ACTIVE) {
      data.octet = 0;
    } else if (sys.state === ids.MATCH) {
      if (data.octet > 255) {
        sys.state = ids.NOMATCH;
        sys.phraseLength = 0;
      }
    }
  },
  // Get the numeric value of the decimal octet.
  decDigit(sys, chars, phraseIndex, data) {
    if (sys.state === ids.MATCH) {
      data.octet = 10 * data.octet + chars[phraseIndex] - 48;
    }
  },
};

module.exports = cb;
