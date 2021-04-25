# apg-js-examples

## Installation

**npm**

```
mkdir node_modules
npm install apg-js-examples
cd node_modules/apg-js-examples
```

**GitHub**

```
mkdir node_modules
cd node_modules
git clone https://github.com/ldthomas/apg-js.git
git clone https://github.com/ldthomas/apg-js-examples.git
cd apg-js-examples
```

## Description

This package contains a large set of examples of using `apg-js`,
the JavaScript version of APG, an ABNF Parser Generator.
Each example is in its own directory and in that directory is
a script, `main.sh`, which will execute the example. Many examples
have multiple options. In these cases, running the script with
no arguments will display a desciption of the example and a
detailed list of the options available.

npm scripts are also available for each of these examples
in `package.json`. For example,

```
src/ast/main.sh
&
npm run ast
```

both run the AST test.

If executing the scripts directly or in with a debugger, they should be
excuted from the repository directory for correct relative path name alignment.

Each of the four libraries, apg-conv-api, apg-lib, apg-api and apg-exp,
has been bundled for browser use. Consequently, the examples for
each of these libraries contains an example of browser usage.
The browser-based example file names will have a "web-" prefix.
