// copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.0.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 11
  //       udts = 0
  //    opcodes = 40
  //        ---   ABNF original opcodes
  //        ALT = 3
  //        CAT = 4
  //        REP = 4
  //        RNM = 19
  //        TLS = 3
  //        TBS = 4
  //        TRG = 3
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [10 - 122]
  // ```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'ini', lower: 'ini', index: 0, isBkr: false};
  this.rules[1] = {name: 'section', lower: 'section', index: 1, isBkr: false};
  this.rules[2] = {name: 'section-name', lower: 'section-name', index: 2, isBkr: false};
  this.rules[3] = {name: 'key', lower: 'key', index: 3, isBkr: false};
  this.rules[4] = {name: 'equals', lower: 'equals', index: 4, isBkr: false};
  this.rules[5] = {name: 'value', lower: 'value', index: 5, isBkr: false};
  this.rules[6] = {name: 'line-end', lower: 'line-end', index: 6, isBkr: false};
  this.rules[7] = {name: 'alphanum', lower: 'alphanum', index: 7, isBkr: false};
  this.rules[8] = {name: 'alpha', lower: 'alpha', index: 8, isBkr: false};
  this.rules[9] = {name: 'digit', lower: 'digit', index: 9, isBkr: false};
  this.rules[10] = {name: 'owsp', lower: 'owsp', index: 10, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* ini */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,3,4,5,6,7]};// CAT
  this.rules[0].opcodes[1] = {type: 3, min: 0, max: 1};// REP
  this.rules[0].opcodes[2] = {type: 4, index: 1};// RNM(section)
  this.rules[0].opcodes[3] = {type: 4, index: 3};// RNM(key)
  this.rules[0].opcodes[4] = {type: 4, index: 4};// RNM(equals)
  this.rules[0].opcodes[5] = {type: 4, index: 5};// RNM(value)
  this.rules[0].opcodes[6] = {type: 4, index: 10};// RNM(owsp)
  this.rules[0].opcodes[7] = {type: 4, index: 6};// RNM(line-end)

  /* section */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7]};// CAT
  this.rules[1].opcodes[1] = {type: 7, string: [91]};// TLS
  this.rules[1].opcodes[2] = {type: 4, index: 10};// RNM(owsp)
  this.rules[1].opcodes[3] = {type: 4, index: 2};// RNM(section-name)
  this.rules[1].opcodes[4] = {type: 4, index: 10};// RNM(owsp)
  this.rules[1].opcodes[5] = {type: 7, string: [93]};// TLS
  this.rules[1].opcodes[6] = {type: 4, index: 10};// RNM(owsp)
  this.rules[1].opcodes[7] = {type: 4, index: 6};// RNM(line-end)

  /* section-name */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 4, index: 7};// RNM(alphanum)

  /* key */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 4, index: 7};// RNM(alphanum)

  /* equals */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
  this.rules[4].opcodes[1] = {type: 4, index: 10};// RNM(owsp)
  this.rules[4].opcodes[2] = {type: 7, string: [61]};// TLS
  this.rules[4].opcodes[3] = {type: 4, index: 10};// RNM(owsp)

  /* value */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
  this.rules[5].opcodes[1] = {type: 4, index: 9};// RNM(digit)

  /* line-end */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
  this.rules[6].opcodes[1] = {type: 6, string: [13,10]};// TBS
  this.rules[6].opcodes[2] = {type: 6, string: [10]};// TBS
  this.rules[6].opcodes[3] = {type: 6, string: [13]};// TBS

  /* alphanum */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[7].opcodes[1] = {type: 4, index: 8};// RNM(alpha)
  this.rules[7].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[7].opcodes[3] = {type: 1, children: [4,5]};// ALT
  this.rules[7].opcodes[4] = {type: 4, index: 8};// RNM(alpha)
  this.rules[7].opcodes[5] = {type: 4, index: 9};// RNM(digit)

  /* alpha */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[8].opcodes[1] = {type: 5, min: 65, max: 90};// TRG
  this.rules[8].opcodes[2] = {type: 5, min: 97, max: 122};// TRG

  /* digit */
  this.rules[9].opcodes = [];
  this.rules[9].opcodes[0] = {type: 5, min: 48, max: 57};// TRG

  /* owsp */
  this.rules[10].opcodes = [];
  this.rules[10].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[10].opcodes[1] = {type: 6, string: [32]};// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += "; a simplified version of an ini file\n";
    str += "; an optional section name line\n";
    str += "; one required key/value pair line\n";
    str += "ini          = [section] key equals value owsp line-end\n";
    str += "section      = \"[\" owsp section-name owsp \"]\" owsp line-end\n";
    str += "section-name = alphanum\n";
    str += "key          = alphanum\n";
    str += "equals       = owsp \"=\" owsp\n";
    str += "value        = 1*digit\n";
    str += "line-end     = %d13.10 / %d10 / %d13\n";
    str += "alphanum     = alpha *(alpha / digit)\n";
    str += "alpha        = %d65-90 / %d97-122\n";
    str += "digit        = %d48-57\n";
    str += "owsp         = *%d32\n";
    return str;
  }
}
