/* eslint-disable func-names */
/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a further demonstration of translating the AST in the replacement function.
// See the [ast]() example here for a discussion of the AST as it is available to `apg-exp`.
// This is a slightly more interesting translation.
// It translates the famous "dangling else" ambiguity problem into its different interpretations.
// You can find it in the *Dragon Book*, Aho, Lam, Sethi & Ullman, pg. 211.
(function danglingElse() {
  const apgJs = require('apg-js');
  const near = new (require('./grammars/dangling-else-near'))();
  const far = new (require('./grammars/dangling-else-far'))();

  const { apgExp } = apgJs;
  const { apgLib } = apgJs;
  const id = apgLib.ids;
  /* the AST callback translation functions */
  const astStmt = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        /* open brackets */
        data.output += '{';
      }
      data.stmtDepth += 1;
    } else if (state === id.SEM_POST) {
      data.stmtDepth -= 1;
      if (data.stmtDepth > 0) {
        /* close brackets */
        data.output += '}';
      }
    }
    return ret;
  };
  const astStmtFar = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        data.output += '{';
      }
    } else if (state === id.SEM_POST) {
      if (data.stmtDepth > 0) {
        data.output += '}';
      }
    }
    return ret;
  };
  const astIfStmt = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        data.output += '{';
      }
      data.stmtDepth += 1;
    } else if (state === id.SEM_POST) {
      data.stmtDepth -= 1;
      if (data.stmtDepth > 0) {
        data.output += '}';
      }
    }
    return ret;
  };
  const astIf = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += 'if ';
    }
    return ret;
  };
  const astThen = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += ' then ';
    }
    return ret;
  };
  const astElse = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += ' else ';
    }
    return ret;
  };
  const astExpr = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
    }
    return ret;
  };
  const astOther = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
    }
    return ret;
  };
  const astOtherStmt = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
    }
    return ret;
  };
  const astOtherElse = function (state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      data.output += '{';
      data.output += apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      data.output += '}';
    }
    return ret;
  };
  const replacementFunction = function (result, exp) {
    const data = {
      stmtDepth: 0,
      output: '',
    };
    exp.ast.translate(data);
    return data.output;
  };
  try {
    let exp;
    let txt;
    const str = 'if E1 then if E2 then S1 else S2';
    // This grammar and example demonstrates the "nearest-match" interpretation of the dangling else problem.
    // That is, the "else" clause is associated with the nearest "then" clause.
    exp = new apgExp(near);
    exp.exclude(['if', 'then', 'else', 'sep']);
    exp.ast.callbacks.stmt = astStmt;
    exp.ast.callbacks['if-word'] = astIf;
    exp.ast.callbacks['then-word'] = astThen;
    exp.ast.callbacks['else-word'] = astElse;
    exp.ast.callbacks.expr = astExpr;
    exp.ast.callbacks.other = astOther;
    txt = exp.replace(str, replacementFunction);
    console.log();
    console.log('dangling else translations(See Aho, Lam, Sethi & Ullman, pg. 211)');
    console.log();
    console.log('nearest grammar: ');
    console.log(exp.source);
    console.log(`  string: ${str}`);
    console.log(" nearest: the 'else' clause is associated with the nearest 'then' clause");
    console.log(` nearest: ${txt}`);
    // This grammar and example demonstrates the "furthest-match" interpretation of the dangling else problem.
    // That is, the "else" clause is associated with the furthest "then" clause.
    exp = new apgExp(far);
    exp.exclude(['if', 'then', 'else', 'sep']);
    exp.ast.callbacks.stmt = astStmtFar;
    exp.ast.callbacks['if-stmt'] = astIfStmt;
    exp.ast.callbacks['if-word'] = astIf;
    exp.ast.callbacks['then-word'] = astThen;
    exp.ast.callbacks['else-word'] = astElse;
    exp.ast.callbacks.expr = astExpr;
    exp.ast.callbacks['other-stmt'] = astOtherStmt;
    exp.ast.callbacks['other-else'] = astOtherElse;
    txt = exp.replace(str, replacementFunction);
    console.log();
    console.log('furthest grammar: ');
    console.log(exp.source);
    console.log(`  string: ${str}`);
    console.log("furthest: the 'else' clause is associated with the furthest 'then' clause");
    console.log(`furthest: ${txt}`);
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
})();
