// copyright: Copyright (c) 2024 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.4.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 24
  //       udts = 0
  //    opcodes = 137
  //        ---   ABNF original opcodes
  //        ALT = 20
  //        CAT = 15
  //        REP = 17
  //        RNM = 51
  //        TLS = 5
  //        TBS = 17
  //        TRG = 12
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
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
  this.rules[0] = { name: 'IniFile', lower: 'inifile', index: 0, isBkr: false };
  this.rules[1] = { name: 'Section', lower: 'section', index: 1, isBkr: false };
  this.rules[2] = { name: 'SectionLine', lower: 'sectionline', index: 2, isBkr: false };
  this.rules[3] = { name: 'GoodSectionLine', lower: 'goodsectionline', index: 3, isBkr: false };
  this.rules[4] = { name: 'BadSectionLine', lower: 'badsectionline', index: 4, isBkr: false };
  this.rules[5] = { name: 'ValueLine', lower: 'valueline', index: 5, isBkr: false };
  this.rules[6] = { name: 'GoodValueLine', lower: 'goodvalueline', index: 6, isBkr: false };
  this.rules[7] = { name: 'BadValueLine', lower: 'badvalueline', index: 7, isBkr: false };
  this.rules[8] = { name: 'ValueArray', lower: 'valuearray', index: 8, isBkr: false };
  this.rules[9] = { name: 'SectionName', lower: 'sectionname', index: 9, isBkr: false };
  this.rules[10] = { name: 'KeyName', lower: 'keyname', index: 10, isBkr: false };
  this.rules[11] = { name: 'Value', lower: 'value', index: 11, isBkr: false };
  this.rules[12] = { name: 'DQuotedString', lower: 'dquotedstring', index: 12, isBkr: false };
  this.rules[13] = { name: 'SQuotedString', lower: 'squotedstring', index: 13, isBkr: false };
  this.rules[14] = { name: 'AlphaDigit', lower: 'alphadigit', index: 14, isBkr: false };
  this.rules[15] = { name: 'BlankLine', lower: 'blankline', index: 15, isBkr: false };
  this.rules[16] = { name: 'GoodBlankLine', lower: 'goodblankline', index: 16, isBkr: false };
  this.rules[17] = { name: 'BadBlankLine', lower: 'badblankline', index: 17, isBkr: false };
  this.rules[18] = { name: 'LineEnd', lower: 'lineend', index: 18, isBkr: false };
  this.rules[19] = { name: 'comment', lower: 'comment', index: 19, isBkr: false };
  this.rules[20] = { name: 'wsp', lower: 'wsp', index: 20, isBkr: false };
  this.rules[21] = { name: 'alpha', lower: 'alpha', index: 21, isBkr: false };
  this.rules[22] = { name: 'digit', lower: 'digit', index: 22, isBkr: false };
  this.rules[23] = { name: 'any', lower: 'any', index: 23, isBkr: false };

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* IniFile */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = { type: 2, children: [1,5] };// CAT
  this.rules[0].opcodes[1] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[0].opcodes[2] = { type: 1, children: [3,4] };// ALT
  this.rules[0].opcodes[3] = { type: 4, index: 15 };// RNM(BlankLine)
  this.rules[0].opcodes[4] = { type: 4, index: 5 };// RNM(ValueLine)
  this.rules[0].opcodes[5] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[0].opcodes[6] = { type: 4, index: 1 };// RNM(Section)

  /* Section */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = { type: 2, children: [1,2] };// CAT
  this.rules[1].opcodes[1] = { type: 4, index: 2 };// RNM(SectionLine)
  this.rules[1].opcodes[2] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[1].opcodes[3] = { type: 1, children: [4,5] };// ALT
  this.rules[1].opcodes[4] = { type: 4, index: 15 };// RNM(BlankLine)
  this.rules[1].opcodes[5] = { type: 4, index: 5 };// RNM(ValueLine)

  /* SectionLine */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[2].opcodes[1] = { type: 4, index: 3 };// RNM(GoodSectionLine)
  this.rules[2].opcodes[2] = { type: 4, index: 4 };// RNM(BadSectionLine)

  /* GoodSectionLine */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = { type: 2, children: [1,2,3,4,5,6,7,9] };// CAT
  this.rules[3].opcodes[1] = { type: 7, string: [91] };// TLS
  this.rules[3].opcodes[2] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[3].opcodes[3] = { type: 4, index: 9 };// RNM(SectionName)
  this.rules[3].opcodes[4] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[3].opcodes[5] = { type: 7, string: [93] };// TLS
  this.rules[3].opcodes[6] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[3].opcodes[7] = { type: 3, min: 0, max: 1 };// REP
  this.rules[3].opcodes[8] = { type: 4, index: 19 };// RNM(comment)
  this.rules[3].opcodes[9] = { type: 4, index: 18 };// RNM(LineEnd)

  /* BadSectionLine */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = { type: 2, children: [1,2,4] };// CAT
  this.rules[4].opcodes[1] = { type: 7, string: [91] };// TLS
  this.rules[4].opcodes[2] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[4].opcodes[3] = { type: 4, index: 23 };// RNM(any)
  this.rules[4].opcodes[4] = { type: 4, index: 18 };// RNM(LineEnd)

  /* ValueLine */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[5].opcodes[1] = { type: 4, index: 6 };// RNM(GoodValueLine)
  this.rules[5].opcodes[2] = { type: 4, index: 7 };// RNM(BadValueLine)

  /* GoodValueLine */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = { type: 2, children: [1,2,3,4,5,6,7,9] };// CAT
  this.rules[6].opcodes[1] = { type: 4, index: 10 };// RNM(KeyName)
  this.rules[6].opcodes[2] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[6].opcodes[3] = { type: 7, string: [61] };// TLS
  this.rules[6].opcodes[4] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[6].opcodes[5] = { type: 4, index: 8 };// RNM(ValueArray)
  this.rules[6].opcodes[6] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[6].opcodes[7] = { type: 3, min: 0, max: 1 };// REP
  this.rules[6].opcodes[8] = { type: 4, index: 19 };// RNM(comment)
  this.rules[6].opcodes[9] = { type: 4, index: 18 };// RNM(LineEnd)

  /* BadValueLine */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = { type: 2, children: [1,4,6] };// CAT
  this.rules[7].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[7].opcodes[2] = { type: 5, min: 33, max: 90 };// TRG
  this.rules[7].opcodes[3] = { type: 5, min: 92, max: 126 };// TRG
  this.rules[7].opcodes[4] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[7].opcodes[5] = { type: 4, index: 23 };// RNM(any)
  this.rules[7].opcodes[6] = { type: 4, index: 18 };// RNM(LineEnd)

  /* ValueArray */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = { type: 2, children: [1,2] };// CAT
  this.rules[8].opcodes[1] = { type: 4, index: 11 };// RNM(Value)
  this.rules[8].opcodes[2] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[8].opcodes[3] = { type: 2, children: [4,5,6,7] };// CAT
  this.rules[8].opcodes[4] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[8].opcodes[5] = { type: 7, string: [44] };// TLS
  this.rules[8].opcodes[6] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[8].opcodes[7] = { type: 4, index: 11 };// RNM(Value)

  /* SectionName */
  this.rules[9].opcodes = [];
  this.rules[9].opcodes[0] = { type: 2, children: [1,4] };// CAT
  this.rules[9].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[9].opcodes[2] = { type: 4, index: 21 };// RNM(alpha)
  this.rules[9].opcodes[3] = { type: 6, string: [95] };// TBS
  this.rules[9].opcodes[4] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[9].opcodes[5] = { type: 1, children: [6,7,8] };// ALT
  this.rules[9].opcodes[6] = { type: 4, index: 21 };// RNM(alpha)
  this.rules[9].opcodes[7] = { type: 4, index: 22 };// RNM(digit)
  this.rules[9].opcodes[8] = { type: 6, string: [95] };// TBS

  /* KeyName */
  this.rules[10].opcodes = [];
  this.rules[10].opcodes[0] = { type: 2, children: [1,4] };// CAT
  this.rules[10].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[10].opcodes[2] = { type: 4, index: 21 };// RNM(alpha)
  this.rules[10].opcodes[3] = { type: 6, string: [95] };// TBS
  this.rules[10].opcodes[4] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[10].opcodes[5] = { type: 1, children: [6,7,8] };// ALT
  this.rules[10].opcodes[6] = { type: 4, index: 21 };// RNM(alpha)
  this.rules[10].opcodes[7] = { type: 4, index: 22 };// RNM(digit)
  this.rules[10].opcodes[8] = { type: 6, string: [95] };// TBS

  /* Value */
  this.rules[11].opcodes = [];
  this.rules[11].opcodes[0] = { type: 1, children: [1,2,3] };// ALT
  this.rules[11].opcodes[1] = { type: 4, index: 12 };// RNM(DQuotedString)
  this.rules[11].opcodes[2] = { type: 4, index: 13 };// RNM(SQuotedString)
  this.rules[11].opcodes[3] = { type: 4, index: 14 };// RNM(AlphaDigit)

  /* DQuotedString */
  this.rules[12].opcodes = [];
  this.rules[12].opcodes[0] = { type: 2, children: [1,2,6] };// CAT
  this.rules[12].opcodes[1] = { type: 6, string: [34] };// TBS
  this.rules[12].opcodes[2] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[12].opcodes[3] = { type: 1, children: [4,5] };// ALT
  this.rules[12].opcodes[4] = { type: 5, min: 32, max: 33 };// TRG
  this.rules[12].opcodes[5] = { type: 5, min: 35, max: 126 };// TRG
  this.rules[12].opcodes[6] = { type: 6, string: [34] };// TBS

  /* SQuotedString */
  this.rules[13].opcodes = [];
  this.rules[13].opcodes[0] = { type: 2, children: [1,2,6] };// CAT
  this.rules[13].opcodes[1] = { type: 6, string: [39] };// TBS
  this.rules[13].opcodes[2] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[13].opcodes[3] = { type: 1, children: [4,5] };// ALT
  this.rules[13].opcodes[4] = { type: 5, min: 32, max: 38 };// TRG
  this.rules[13].opcodes[5] = { type: 5, min: 40, max: 126 };// TRG
  this.rules[13].opcodes[6] = { type: 6, string: [39] };// TBS

  /* AlphaDigit */
  this.rules[14].opcodes = [];
  this.rules[14].opcodes[0] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[14].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[14].opcodes[2] = { type: 4, index: 21 };// RNM(alpha)
  this.rules[14].opcodes[3] = { type: 4, index: 22 };// RNM(digit)

  /* BlankLine */
  this.rules[15].opcodes = [];
  this.rules[15].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[15].opcodes[1] = { type: 4, index: 16 };// RNM(GoodBlankLine)
  this.rules[15].opcodes[2] = { type: 4, index: 17 };// RNM(BadBlankLine)

  /* GoodBlankLine */
  this.rules[16].opcodes = [];
  this.rules[16].opcodes[0] = { type: 2, children: [1,2,4] };// CAT
  this.rules[16].opcodes[1] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[16].opcodes[2] = { type: 3, min: 0, max: 1 };// REP
  this.rules[16].opcodes[3] = { type: 4, index: 19 };// RNM(comment)
  this.rules[16].opcodes[4] = { type: 4, index: 18 };// RNM(LineEnd)

  /* BadBlankLine */
  this.rules[17].opcodes = [];
  this.rules[17].opcodes[0] = { type: 2, children: [1,4,5,8,10] };// CAT
  this.rules[17].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[17].opcodes[2] = { type: 6, string: [32] };// TBS
  this.rules[17].opcodes[3] = { type: 6, string: [9] };// TBS
  this.rules[17].opcodes[4] = { type: 4, index: 20 };// RNM(wsp)
  this.rules[17].opcodes[5] = { type: 1, children: [6,7] };// ALT
  this.rules[17].opcodes[6] = { type: 5, min: 33, max: 58 };// TRG
  this.rules[17].opcodes[7] = { type: 5, min: 60, max: 126 };// TRG
  this.rules[17].opcodes[8] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[17].opcodes[9] = { type: 4, index: 23 };// RNM(any)
  this.rules[17].opcodes[10] = { type: 4, index: 18 };// RNM(LineEnd)

  /* LineEnd */
  this.rules[18].opcodes = [];
  this.rules[18].opcodes[0] = { type: 1, children: [1,2,3] };// ALT
  this.rules[18].opcodes[1] = { type: 6, string: [13,10] };// TBS
  this.rules[18].opcodes[2] = { type: 6, string: [10] };// TBS
  this.rules[18].opcodes[3] = { type: 6, string: [13] };// TBS

  /* comment */
  this.rules[19].opcodes = [];
  this.rules[19].opcodes[0] = { type: 2, children: [1,2] };// CAT
  this.rules[19].opcodes[1] = { type: 6, string: [59] };// TBS
  this.rules[19].opcodes[2] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[19].opcodes[3] = { type: 4, index: 23 };// RNM(any)

  /* wsp */
  this.rules[20].opcodes = [];
  this.rules[20].opcodes[0] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[20].opcodes[1] = { type: 1, children: [2,3] };// ALT
  this.rules[20].opcodes[2] = { type: 6, string: [32] };// TBS
  this.rules[20].opcodes[3] = { type: 6, string: [9] };// TBS

  /* alpha */
  this.rules[21].opcodes = [];
  this.rules[21].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[21].opcodes[1] = { type: 5, min: 65, max: 90 };// TRG
  this.rules[21].opcodes[2] = { type: 5, min: 97, max: 122 };// TRG

  /* digit */
  this.rules[22].opcodes = [];
  this.rules[22].opcodes[0] = { type: 5, min: 48, max: 57 };// TRG

  /* any */
  this.rules[23].opcodes = [];
  this.rules[23].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[23].opcodes[1] = { type: 5, min: 32, max: 126 };// TRG
  this.rules[23].opcodes[2] = { type: 6, string: [9] };// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += ";\n";
    str += "; Ref: https://en.wikipedia.org: INI File\n";
    str += ";\n";
    str += "; comments begin with the semicolon, \";\" and continue to the end of the line\n";
    str += "; comments may appear on valid section and value lines as well as blank lines\n";
    str += "; line ends may be CRLF, LF or CR\n";
    str += "; tabs, 0x09, may NOT occur in quoted strings\n";
    str += ";\n";
    str += "; keys may have multiple values\n";
    str += ";   - multiple values may be given as a comma delimited list on a single line\n";
    str += ";   - multiple values may be listed separately on separate lines with the same key name\n";
    str += ";\n";
    str += "; section names are optional\n";
    str += ";   - keys need not appear in a named section\n";
    str += ";\n";
    str += "; sections are \"disjoint\",\n";
    str += ";   - that is the keys in multiple occurrences of a section name are\n";
    str += ";   - simply joined together as if they appeared contiguously in a single section\n";
    str += ";\n";
    str += "; sections end at the beginning of a new section or the end of file\n";
    str += ";\n";
    str += "; section and key names are alphanumeric + underscore (must begin with alpha or underscore)\n";
    str += "; values that are not alphanumeric must be single or double quoted\n";
    str += ";\n";
    str += "; The grammar is designed to accept any string of ASCII characters without failure.\n";
    str += "; The \"error productions\", BadSectionLine, BadValueLine, BadBlankLine are meant to accept all lines\n";
    str += "; that are not otherwise correct blank, section or value lines. This is so that\n";
    str += "; parser callback functions can recognize input errors and report or react to them\n";
    str += "; in an application-dependent manner.\n";
    str += ";\n";
    str += ";\n";
    str += "IniFile         = *(BlankLine/ValueLine) *Section\n";
    str += "Section         = SectionLine *(BlankLine/ValueLine)\n";
    str += "SectionLine     = GoodSectionLine/BadSectionLine\n";
    str += "GoodSectionLine = \"[\" wsp SectionName wsp \"]\" wsp [comment] LineEnd\n";
    str += "BadSectionLine  = \"[\" *any LineEnd;\n";
    str += "ValueLine       = GoodValueLine/BadValueLine\n";
    str += "GoodValueLine   = KeyName wsp \"=\" wsp ValueArray wsp [comment] LineEnd\n";
    str += "BadValueLine    = (%d33-90/%d92-126) *any LineEnd\n";
    str += "ValueArray      = Value *(wsp \",\" wsp Value)\n";
    str += "SectionName     = (alpha/%d95) *(alpha/digit/%d95)\n";
    str += "KeyName         = (alpha/%d95) *(alpha/digit/%d95)\n";
    str += "Value           = DQuotedString/SQuotedString/AlphaDigit\n";
    str += "DQuotedString   = %d34 1*(%d32-33/%d35-126) %d34\n";
    str += "SQuotedString   = %d39 1*(%d32-38/%d40-126) %d39\n";
    str += "AlphaDigit      = 1*(alpha/digit)\n";
    str += "BlankLine       = GoodBlankLine/BadBlankLine\n";
    str += "GoodBlankLine   = wsp [comment] LineEnd\n";
    str += "BadBlankLine    = (%d32/%d9) wsp (%d33-58/%d60-126) *any LineEnd\n";
    str += "LineEnd         = %d13.10/%d10/%d13\n";
    str += "comment         = %d59 *any\n";
    str += "wsp             = *(%d32/%d9)\n";
    str += "alpha           = %d65-90/%d97-122\n";
    str += "digit           = %d48-57\n";
    str += "any             = %d32-126/%d9\n";
    return str;
  }
}
