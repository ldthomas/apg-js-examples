// no reporting of specific errors
// force parsing failure on semantic errors
// user will need to trace(debug) the parse tree to find parsing errors
const { apgLib } = require('apg-js');
const id = apgLib.ids;
const utils = apgLib.utils;
const cb = {
  // handle the URI
  URI: function URI(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        break;
      case id.MATCH:
        data.uri = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
      case id.EMPTY:
        result.state = id.NOMATCH;
        result.phraseLength = 0;
        break;
    }
  },
  scheme: function scheme(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.scheme = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
    }
  },
  userinfoAt: function userinfo(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.userinfo = utils.charsToString(chars, phraseIndex, result.phraseLength - 1);
        break;
    }
  },
  host: function host(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        data.iplit = false;
        break;
      case id.MATCH:
        if (data.iplit) {
          // strip leading "[" and trailing "]" brackets
          data.uriElements.host = utils.charsToString(chars, phraseIndex + 1, result.phraseLength - 2);
        } else {
          data.uriElements.host = utils.charsToString(chars, phraseIndex, result.phraseLength);
        }
        break;
      case id.EMPTY:
        data.uriElements.host = '';
        break;
    }
  },
  ipLiteral: function ipLiteral(result, chars, phraseIndex, data) {
    if (result.state === id.MATCH) {
      data.iplit = true;
    }
  },
  port: function port(result, chars, phraseIndex, data) {
    let parsed = 0;
    let port = '';
    switch (result.state) {
      case id.MATCH:
        port = utils.charsToString(chars, phraseIndex, result.phraseLength);
        parsed = parseInt(port);
        if (Number.isNaN(parsed)) {
          result.state = id.NOMATCH;
          result.phraseLength = 0;
        } else {
          data.uriElements.port = parsed;
        }
        break;
      case id.EMPTY:
        data.uriElements.port = '';
        break;
    }
  },
  pathAbempty: function pathAbempty(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.path = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
      case id.EMPTY:
        data.uriElements.path = '';
        break;
    }
  },
  pathAbsolute: function pathAbsolute(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.path = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
    }
  },
  pathRootless: function pathRootless(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.path = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
    }
  },
  pathEmpty: function pathEmpty(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
      case id.NOMATCH:
        result.state = id.NOMATCH;
        result.phraseLength = 0;
      case id.EMPTY:
        data.uriElements.path = '';
        break;
    }
  },
  query: function query(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.query = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
      case id.EMPTY:
        data.uriElements.query = '';
        break;
    }
  },
  fragment: function fragment(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.uriElements.fragment = utils.charsToString(chars, phraseIndex, result.phraseLength);
        break;
      case id.EMPTY:
        data.uriElements.fragment = '';
        break;
    }
  },
  ipv4: function ipv4(result, chars, phraseIndex, data) {
    if (result.state === id.MATCH) {
      data.ipv4 = true;
    }
  },
  h16: function h16(result, chars, phraseIndex, data) {
    if (result.state === id.MATCH) {
      data.h16count += 1;
    }
  },
  nodcolon: function nodcolon(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        data.h16count = 0;
        data.ipv4 = false;
        break;
      case id.MATCH:
        // semantically validate the number of 16-bit digits
        if (data.ipv4) {
          if (data.h16count === 6) {
            result.state = id.MATCH;
          } else {
            result.state = id.NOMATCH;
            result.phraseLength = 0;
          }
        } else {
          if (data.h16count === 8) {
            result.state = id.MATCH;
          } else {
            result.state = id.NOMATCH;
            result.phraseLength = 0;
          }
        }
        break;
    }
  },
  dcolon: function dcolon(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        data.h16count = 0;
        data.ipv4 = false;
        break;
      case id.MATCH:
        // semantically validate the number of 16-bit digits
        if (data.ipv4) {
          if (data.h16count < 6) {
            result.state = id.MATCH;
          } else {
            result.state = id.NOMATCH;
            result.phraseLength = 0;
          }
        } else {
          if (data.h16count < 8) {
            result.state = id.MATCH;
          } else {
            result.state = id.NOMATCH;
            result.phraseLength = 0;
          }
        }
        break;
    }
  },
  decOctet: function decOctet(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        data.octet = 0;
        break;
      case id.MATCH:
        // semantically validate the octet
        if (data.octet > 255) {
          result.state = id.NOMATCH;
          result.phraseLength = 0;
        }
        break;
    }
  },
  decDigit: function decDigit(result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.MATCH:
        data.octet = 10 * data.octet + chars[phraseIndex] - 48;
        break;
    }
  },
};
module.exports = cb;
