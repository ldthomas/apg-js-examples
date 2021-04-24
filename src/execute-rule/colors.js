// copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.0.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 3
  //       udts = 4
  //    opcodes = 15
  //        ---   ABNF original opcodes
  //        ALT = 1
  //        CAT = 3
  //        REP = 1
  //        RNM = 2
  //        TLS = 4
  //        TBS = 0
  //        TRG = 0
  //        ---   SABNF superset opcodes
  //        UDT = 4
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [44 - 119] + user defined
  //```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'start', lower: 'start', index: 0, isBkr: false};
  this.rules[1] = {name: 'color', lower: 'color', index: 1, isBkr: false};
  this.rules[2] = {name: 'dummy', lower: 'dummy', index: 2, isBkr: false};

  /* UDTS */
  this.udts = [];
  this.udts[0] = {name: 'u_red', lower: 'u_red', index: 0, empty: false, isBkr: false};
  this.udts[1] = {name: 'u_white', lower: 'u_white', index: 1, empty: false, isBkr: false};
  this.udts[2] = {name: 'u_blue', lower: 'u_blue', index: 2, empty: false, isBkr: false};
  this.udts[3] = {name: 'u_yellow', lower: 'u_yellow', index: 3, empty: false, isBkr: false};

  /* OPCODES */
  /* start */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(color)
  this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[0].opcodes[3] = {type: 2, children: [4,5]};// CAT
  this.rules[0].opcodes[4] = {type: 7, string: [44]};// TLS
  this.rules[0].opcodes[5] = {type: 4, index: 1};// RNM(color)

  /* color */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
  this.rules[1].opcodes[1] = {type: 7, string: [114,101,100]};// TLS
  this.rules[1].opcodes[2] = {type: 7, string: [119,104,105,116,101]};// TLS
  this.rules[1].opcodes[3] = {type: 7, string: [98,108,117,101]};// TLS

  /* dummy */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
  this.rules[2].opcodes[1] = {type: 11, empty: false, index: 0};// UDT(u_red)
  this.rules[2].opcodes[2] = {type: 11, empty: false, index: 1};// UDT(u_white)
  this.rules[2].opcodes[3] = {type: 11, empty: false, index: 2};// UDT(u_blue)
  this.rules[2].opcodes[4] = {type: 11, empty: false, index: 3};// UDT(u_yellow)

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    let str = "";
    str += "start = color *(\",\" color)\n";
    str += "color = \"red\" / \"white\" / \"blue\"\n";
    str += "dummy = u_red u_white u_blue u_yellow\n";
    return str;
  }
}
