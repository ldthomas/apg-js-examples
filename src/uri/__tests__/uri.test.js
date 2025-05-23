const fs = require('node:fs');
const parser = require('../parser');
const path = require('node:path');
const { apgLib } = require('apg-js');
const uriParser = new apgLib.parser();
const grammar = new (require('../grammar'))();

let urisPath = path.resolve(__dirname, 'valid-uris.json');
const validUris = JSON.parse(fs.readFileSync(urisPath, 'utf-8'));
urisPath = path.resolve(__dirname, 'invalid-uris.json');
const invalidUris = JSON.parse(fs.readFileSync(urisPath, 'utf-8'));
urisPath = path.resolve(__dirname, 'valid-chars.json');
const validChars = JSON.parse(fs.readFileSync(urisPath, 'utf-8'));
urisPath = path.resolve(__dirname, 'invalid-chars.json');
const invalidChars = JSON.parse(fs.readFileSync(urisPath, 'utf-8'));

function parseUri(input) {
  try {
    return parser(input);
  } catch {
    return null;
  }
}

describe('Valid character tests - rules with characters expanded to primatives.', () => {
  test.concurrent.each(Object.entries(validChars))('Rule: %s', (test_name, test) => {
    result = uriParser.parse(grammar, test.rule, test.input);
    expect(result.success).toBe(test.answer);
  });
});
describe('Invalid character tests - rules with characters expanded to primatives.', () => {
  test.concurrent.each(Object.entries(invalidChars))('Rule + invalid character: %s', (test_name, test) => {
    result = uriParser.parse(grammar, test.rule, test.input);
    expect(result.success).toBe(test.answer);
  });
});
describe('Valid URIs', () => {
  test.concurrent.each(Object.entries(validUris))('%s', (test_name, test) => {
    const elements = parseUri(test.msg);
    expect(elements).not.toBeNull();
    if (elements) {
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

describe('Invalid URIs', () => {
  test.concurrent.each(Object.entries(invalidUris))('%s', (test_name, uri) => {
    expect(parseUri(uri)).toBeNull();
  });
});
