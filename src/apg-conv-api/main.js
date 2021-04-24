/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This module provides a suite of function to demonstrate the use of `apg-conv-api`.
module.exports = function (args) {
    "use strict";
    let thisFileName = "suite.js: ";
    let assert = require("assert");
    let apgJs = require("apg-js");
    let apgConvApi = apgJs.apgConvApi;
    let converter = apgConvApi.converter;
    let transformers = apgConvApi.transformers;

    /* display an array of integers in hex format */
    function displayArray(a) {
        let str = "[";
        for (let i = 0; i < a.length; i += 1) {
            if (i > 0) {
                str += ", ";
            }
            str += "0x" + a[i].toString(16);
        }
        return str + "]";
    }

    /* compare two arrays */
    function arraysEqual(a, b) {
        if (a.length == b.length) {
            for (let i = 0; i < a.length; i += 1) {
                if (a[i] != b[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    //This function will test the encoding and decoding of the UTF8 format.<br>
    //There are four tests, one to test each of the value ranges that require 1-, 2-, 3-, and 4-byte encodings.
    function utf8() {
        function verify(name, src, chars, str) {
            console.log();
            console.log(name + " UTF8 test");
            console.log(name + " source: " + displayArray(src));
            console.log(name + "  chars: " + displayArray(chars));
            console.log(name + " string: " + str);

            /* test decode */
            let output = converter.decode("UTF8", src);
            assert(arraysEqual(chars, output), name + " :decode UTF8 failed");

            /* test encode */
            let dst = converter.encode("UTF8", chars);
            assert(arraysEqual(src, dst), name + " :encode UTF8 failed");
        }
        /* verify 1-byte conversions - ASCII */
        let byte1_str = "abc\tXYZ\r\n";
        let byte1_utf8 = Buffer.from([97, 98, 99, 9, 88, 89, 90, 13, 10]);
        let byte1_chars = [97, 98, 99, 9, 88, 89, 90, 13, 10];
        verify("ASCII(1-byte)", byte1_utf8, byte1_chars, byte1_str);

        /* verify 2-byte conversions - BINARY (Latin 1) */
        let byte2_str = "\xa7\xa9\xae\xb6\xfc";
        let byte2_utf8 = Buffer.from([0xc2, 0xa7, 0xc2, 0xa9, 0xc2, 0xae, 0xc2, 0xb6, 0xc3, 0xbc]);
        let byte2_chars = [0xa7, 0xa9, 0xae, 0xb6, 0xfc];
        verify("BINARY(2-byte)", byte2_utf8, byte2_chars, byte2_str);

        /* verify 3-byte conversions - Cherokee */
        let byte3_str = "\u13a3\u13ad\u13b2\u13cd\u13db";
        let byte3_utf8 = Buffer.from([
            0xe1,
            0x8e,
            0xa3,
            0xe1,
            0x8e,
            0xad,
            0xe1,
            0x8e,
            0xb2,
            0xe1,
            0x8f,
            0x8d,
            0xe1,
            0x8f,
            0x9b,
        ]);
        let byte3_chars = [0x13a3, 0x13ad, 0x13b2, 0x13cd, 0x13db];
        verify("Cherokee(3-byte)", byte3_utf8, byte3_chars, byte3_str);

        /* verify 4-byte conversions - Playing Cards */
        let byte4_str = "\u{1F0A1}\u{1F0B1}\u{1F0C1}\u{1F0D1}";
        let byte4_utf8 = Buffer.from([
            0xf0,
            0x9f,
            0x82,
            0xa1,
            0xf0,
            0x9f,
            0x82,
            0xb1,
            0xf0,
            0x9f,
            0x83,
            0x81,
            0xf0,
            0x9f,
            0x83,
            0x91,
        ]);
        let byte4_chars = [0x1f0a1, 0x1f0b1, 0x1f0c1, 0x1f0d1];
        verify("Playing Cards(4-byte)", byte4_utf8, byte4_chars, byte4_str);
    }
    // This function will test encoding and decoding of the UTF16 format.<br>
    // It tests each of the big-endian and little-endian encodings both with and without a Byte Order Mark (BOM).
    //
    // Finally, it demostrates a couple of failures.<br>
    // - an incorrect BOM specification.
    // - integer values that fall outside the UNICODE allowed range.
    //
    // The disallowed ranges are [0xD800-0xDFFF] and [0x110000-Infinity].
    function utf16() {
        let buf, bom, ch;
        let chars = [0x3b1, 0x3b2, 0xd7f0, 0xd7fb, 0x1f0a1, 0x1f0a2];
        let utf16be = Buffer.from([
            0x03,
            0xb1,
            0x03,
            0xb2,
            0xd7,
            0xf0,
            0xd7,
            0xfb,
            0xd8,
            0x3c,
            0xdc,
            0xa1,
            0xd8,
            0x3c,
            0xdc,
            0xa2,
        ]);
        let utf16le = Buffer.from([
            0xb1,
            0x03,
            0xb2,
            0x03,
            0xf0,
            0xd7,
            0xfb,
            0xd7,
            0x3c,
            0xd8,
            0xa1,
            0xdc,
            0x3c,
            0xd8,
            0xa2,
            0xdc,
        ]);
        let bombe = Buffer.from([0xfe, 0xff]);
        let bomle = Buffer.from([0xff, 0xfe]);

        /* UTF16 (BE) */
        buf = converter.encode("UTF16", chars);
        assert(arraysEqual(buf, utf16be), "encode: UTF16 (BE) arrays not equal");

        /* UTF16BE */
        buf = converter.encode("UTF16BE", chars);
        assert(arraysEqual(buf, utf16be), "encode: UTF16BE arrays not equal");

        /* UTF16LE */
        buf = converter.encode("UTF16LE", chars);
        assert(arraysEqual(buf, utf16le), "encode: UTF16BE arrays not equal");

        /* decode UTF16 */
        ch = converter.decode("UTF16", utf16be);
        assert(arraysEqual(ch, chars), "decode: UTF16 arrays not equal");

        /* decode UTF16 w/BOM */
        ch = converter.decode("UTF16", Buffer.concat([bombe, utf16be]));
        assert(arraysEqual(ch, chars), "decode: UTF16 w/BOM arrays not equal");

        /* decode UTF16LE */
        ch = converter.decode("UTF16LE", utf16le);
        assert(arraysEqual(ch, chars), "decode: UTF16LE arrays not equal");

        /* decode UTF16LE w/BOM */
        ch = converter.decode("UTF16", Buffer.concat([bomle, utf16le]));
        assert(arraysEqual(ch, chars), "decode: UTF16LE w/BOM arrays not equal");

        /* decode UTF16LE wrong BOM */
        try {
            ch = converter.decode("UTF16LE", Buffer.concat([bombe, utf16be]));
        } catch (e) {
            console.log("encode EXCEPTION: " + e.message);
        }

        /* bad UNICODE character range */
        try {
            ch = converter.encode("UTF16", [0xd800]);
        } catch (e) {
            console.log("encode EXCEPTION: " + e.message);
        }
        try {
            ch = converter.encode("UTF16", [0x110000]);
        } catch (e) {
            console.log("encode EXCEPTION: " + e.message);
        }
        let str = utf16le.toString("utf16le");
        console.log("apg-conv-api: test suite: utf16: OK: " + str);
    }
    // This base64 test will demonstrate using the low-level `transformers` functions directly.
    //
    // The first test is a simple test of all variations on the string length modulus.
    // That is, the length of the base64 encoding will always be of modulus 4.
    //
    // The second test samples all 256 of the single-byte values, and tests the encoding and decoding
    // against the result from an alternate encoder, `base64-js` which can be installed with `npm install base64-js`.
    function base64() {
        /* all byte length variations */
        let str = ["", "f", "fo", "foo", "foob", "fooba", "foobar"];
        let str64 = ["", "Zg==", "Zm8=", "Zm9v", "Zm9vYg==", "Zm9vYmE=", "Zm9vYmFy"];

        /* all binary bytes from 0x00-FF */
        let binary = Buffer.alloc(256);
        for (let i = 0; i < 256; i += 1) {
            binary[i] = i;
        }

        /* generated from base64-js (npm install base64-js) */
        let binarystr =
            "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==";

        /* test all byte length variations */
        let from, to;
        let encode = transformers.base64.encode;
        let decode = transformers.base64.decode;
        let toString = transformers.base64.toString;
        for (let i = 0; i < str.length; i += 1) {
            from = encode(Buffer.from(str[i]));
            assert(from.toString("ascii") == str64[i]);
        }
        for (let i = 0; i < str.length; i += 1) {
            to = decode(Buffer.from(str64[i]));
            assert(to.toString("ascii") == str[i]);
        }

        /* test all binary values */
        from = encode(binary);
        assert(from.toString("ascii") == binarystr, "encode all binary digits failed");
        to = decode(Buffer.from(binarystr));
        assert(arraysEqual(to, binary), "decode all binary digits failed");

        /* display the base64 of the binary digits with line breaks */
        console.log("base64 of the binary digits with line breaks:");
        console.log(toString(Buffer.from(binarystr)));

        console.log("apg-conv-api: test suite: base64: OK");
    }
    // This test demonstrates the `ESCAPED` format for a wide range of integer values.
    function escaped() {
        let chars = [0x00, 0xff, 0x100, 0xd8ff, 0xffff, 0x10000, 0xffffffff];
        let buf = converter.encode("ESCAPED", chars);
        let str = buf.toString("ascii");
        console.log("escaped: " + str);
        console.log("apg-conv-api: test suite: escaped: OK");
    }
    // This is the example driver.
    /* match the test function with the name */
    let help = "";
    help += "This is a demonstration of the data conversion API, apg-conv-api.\n";
    help += 'Examine or run a debugger on this module, "apg-examples/src/apg-conv-api/main.js" to study the example.\n';
    help += "Note that for web page usage, the generated grammar function needs to be renamed\n";
    help += 'as the node.js name "module.exports" is not allowed.\n';
    help += "\n";
    help += "Usage: npm run apg-conv-api [-- arg]\n";
    help += "  arg: help    (or no arg) to display this help screen.\n";
    help += "       utf8    to run a UTF-8 conversion example\n";
    help += "       utf16   to run a UTF-16 conversion example\n";
    help += "       base64  to run a base64 conversion example\n";
    help += "       escaped to run an escaped format conversion example\n";
    try {
        switch (args[0]) {
            case "utf8":
                utf8();
                break;
            case "utf16":
                utf16();
                break;
            case "base64":
                base64();
                break;
            case "escaped":
                escaped();
                break;
            default:
                console.log(help);
                break;
        }
    } catch (e) {
        console.log("EXCEPTION: " + e.message);
    }
};
