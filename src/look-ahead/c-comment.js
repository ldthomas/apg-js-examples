// copyright: Copyright (c) 2023 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.2.1 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 5
  //       udts = 0
  //    opcodes = 15
  //        ---   ABNF original opcodes
  //        ALT = 1
  //        CAT = 2
  //        REP = 1
  //        RNM = 4
  //        TLS = 3
  //        TBS = 1
  //        TRG = 2
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 1
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [9 - 126]
  // ```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'comment', lower: 'comment', index: 0, isBkr: false};
  this.rules[1] = {name: 'begin', lower: 'begin', index: 1, isBkr: false};
  this.rules[2] = {name: 'stop', lower: 'stop', index: 2, isBkr: false};
  this.rules[3] = {name: 'end', lower: 'end', index: 3, isBkr: false};
  this.rules[4] = {name: 'any', lower: 'any', index: 4, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* comment */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(begin)
  this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[0].opcodes[3] = {type: 2, children: [4,6]};// CAT
  this.rules[0].opcodes[4] = {type: 13};// NOT
  this.rules[0].opcodes[5] = {type: 4, index: 2};// RNM(stop)
  this.rules[0].opcodes[6] = {type: 4, index: 4};// RNM(any)
  this.rules[0].opcodes[7] = {type: 4, index: 3};// RNM(end)

  /* begin */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 7, string: [47,42]};// TLS

  /* stop */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 7, string: [42,47]};// TLS

  /* end */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 7, string: [42,47]};// TLS

  /* any */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
  this.rules[4].opcodes[1] = {type: 5, min: 32, max: 126};// TRG
  this.rules[4].opcodes[2] = {type: 5, min: 9, max: 10};// TRG
  this.rules[4].opcodes[3] = {type: 6, string: [13]};// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += ";\n";
    str += "; C-style comment\n";
    str += ";\n";
    str += "comment = begin *(!stop any) end\n";
    str += "begin = \"/*\"\n";
    str += "stop = \"*/\"\n";
    str += "end = \"*/\"\n";
    str += "any = %d32-126 / %d9-10 / %d13\n";
    return str;
  }
}
