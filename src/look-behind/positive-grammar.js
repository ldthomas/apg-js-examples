// copyright: Copyright (c) 2024 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.4.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 2
  //       udts = 0
  //    opcodes = 6
  //        ---   ABNF original opcodes
  //        ALT = 0
  //        CAT = 1
  //        REP = 1
  //        RNM = 1
  //        TLS = 1
  //        TBS = 0
  //        TRG = 1
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 1
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
  this.rules[0] = { name: 'rule', lower: 'rule', index: 0, isBkr: false };
  this.rules[1] = { name: 'text', lower: 'text', index: 1, isBkr: false };

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* rule */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = { type: 2, children: [1,3] };// CAT
  this.rules[0].opcodes[1] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[0].opcodes[2] = { type: 4, index: 1 };// RNM(text)
  this.rules[0].opcodes[3] = { type: 15 };// BKA
  this.rules[0].opcodes[4] = { type: 7, string: [32,101,110,100] };// TLS

  /* text */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = { type: 5, min: 32, max: 126 };// TRG

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += "rule = *text &&\" end\"\n";
    str += "text = %d32-126\n";
    return str;
  }
}
