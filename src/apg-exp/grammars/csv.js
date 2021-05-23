// copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.0.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 8
  //       udts = 0
  //    opcodes = 27
  //        ---   ABNF original opcodes
  //        ALT = 4
  //        CAT = 3
  //        REP = 4
  //        RNM = 8
  //        TLS = 0
  //        TBS = 4
  //        TRG = 4
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [32 - 126]
  // ```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'csv', lower: 'csv', index: 0, isBkr: false};
  this.rules[1] = {name: 'field', lower: 'field', index: 1, isBkr: false};
  this.rules[2] = {name: 'quoted', lower: 'quoted', index: 2, isBkr: false};
  this.rules[3] = {name: 'quoted-text', lower: 'quoted-text', index: 3, isBkr: false};
  this.rules[4] = {name: 'double-quote', lower: 'double-quote', index: 4, isBkr: false};
  this.rules[5] = {name: 'any-but-quote', lower: 'any-but-quote', index: 5, isBkr: false};
  this.rules[6] = {name: 'text', lower: 'text', index: 6, isBkr: false};
  this.rules[7] = {name: 'any-but-comma', lower: 'any-but-comma', index: 7, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* csv */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(field)
  this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[0].opcodes[3] = {type: 2, children: [4,5]};// CAT
  this.rules[0].opcodes[4] = {type: 6, string: [44]};// TBS
  this.rules[0].opcodes[5] = {type: 4, index: 1};// RNM(field)

  /* field */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[1].opcodes[1] = {type: 4, index: 2};// RNM(quoted)
  this.rules[1].opcodes[2] = {type: 4, index: 6};// RNM(text)

  /* quoted */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
  this.rules[2].opcodes[1] = {type: 6, string: [34]};// TBS
  this.rules[2].opcodes[2] = {type: 4, index: 3};// RNM(quoted-text)
  this.rules[2].opcodes[3] = {type: 6, string: [34]};// TBS

  /* quoted-text */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[3].opcodes[1] = {type: 1, children: [2,3]};// ALT
  this.rules[3].opcodes[2] = {type: 4, index: 5};// RNM(any-but-quote)
  this.rules[3].opcodes[3] = {type: 4, index: 4};// RNM(double-quote)

  /* double-quote */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 3, min: 2, max: 2};// REP
  this.rules[4].opcodes[1] = {type: 6, string: [34]};// TBS

  /* any-but-quote */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[5].opcodes[1] = {type: 5, min: 32, max: 33};// TRG
  this.rules[5].opcodes[2] = {type: 5, min: 35, max: 126};// TRG

  /* text */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[6].opcodes[1] = {type: 4, index: 7};// RNM(any-but-comma)

  /* any-but-comma */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[7].opcodes[1] = {type: 5, min: 32, max: 43};// TRG
  this.rules[7].opcodes[2] = {type: 5, min: 45, max: 126};// TRG

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += "csv           = field *(%d44 field)\n";
    str += "field         = quoted / text\n";
    str += "quoted        = %d34 quoted-text %d34\n";
    str += "quoted-text   = *(any-but-quote / double-quote)\n";
    str += "double-quote  = 2%d34\n";
    str += "any-but-quote = %d32-33 / %d35-126\n";
    str += "text          = *any-but-comma\n";
    str += "any-but-comma = %d32-43 / %d45-126\n";
    return str;
  }
}
