// const { cwd } = require('node:process');
// console.log(`Current directory: ${cwd()}`);
const { apgLib } = require('apg-js');
const parser = new apgLib.parser();
const grammar = new (require('../grammar'))();
const fs = require('node:fs');
const cb = require('../callbacks');
Object.assign(parser.callbacks, {
  URI: cb.URI,
  scheme: cb.scheme,
  'userinfo-at': cb.userinfoAt,
  host: cb.host,
  'IP-literal': cb.ipLiteral,
  port: cb.port,
  'path-abempty': cb.pathAbempty,
  'path-absolute': cb.pathAbsolute,
  'path-rootless': cb.pathRootless,
  'path-empty': cb.pathEmpty,
  query: cb.query,
  fragment: cb.fragment,
  h16: cb.h16,
  nodcolon: cb.nodcolon,
  dcolon: cb.dcolon,
  'dec-octet': cb.decOctet,
  'dec-digit': cb.decDigit,
});

const validUris = JSON.parse(fs.readFileSync('./src/uri/__tests__/valid-uris.json', 'utf-8'));

const parseUri = function (input) {
  const inputCharacterCodes = apgLib.utils.stringToChars(input);
  const data = { uriElements: {} };
  const result = parser.parse(grammar, 0, inputCharacterCodes, data);
  if (!result.success) {
    return null;
  }
  return data.uriElements;
};
describe('Valid URIs', () => {
  test.concurrent.each(Object.entries(validUris))('%s', (test_name, test) => {
    const elements = parseUri(test.msg);
    if (elements === null) {
      expect(true).toBe(false); // force test to fail
    } else {
      for (const [field, value] of Object.entries(test.uri)) {
        if (value === null) {
          expect(elements[field]).toBeUndefined();
        } else {
          expect(elements[field]).toBe(value);
        }
      }
    }
  });
});
// describe('Invalid URIs', () => {
//   test.concurrent.each(Object.entries(invalidUris))('%s', (test_name, test) => {
//     expect(() => new ParsedMessage(test)).toThrow();
//   });
// });
