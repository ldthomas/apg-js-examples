# apg-js-examples

## Note on version 4.2.1

`apg-js` version 4.2.1 made a minor change to the parser and hence the parser generator.
All of the grammars for all of the examples have been re-generated with `apg-js` 4.2.1.
All of the updated examples run as expected.

## Note on version 4.2.0

This version has been tested for compliance with `apg-js` version 4.2.0.

#### The new "all" option

An "all" option has been added to each example which will run all
of the demonstrations for that example.
Along with this is a new npm script `npm run all` which will run all demonstrations for all examples.
(Caveat: this will generate a lot of output.)

Even though the demonstrations are meant to be illustrative and not unit tests the "all" options
and script have served as a crude means of insuring that nothing was broken with changes to `apg-js`.

## Installation

**npm**

```
npm install apg-js-examples
cd node_modules/apg-js-examples
npm install
```

**GitHub**

```
mkdir node_modules
cd node_modules
git clone https://github.com/ldthomas/apg-js.git
git clone https://github.com/ldthomas/apg-js-examples.git
cd apg-js-examples
npm install
```

## Description

This package contains a large set of examples of using `apg-js`,
the JavaScript version of APG, an ABNF Parser Generator.
Each example is in its own directory and in that directory is
a script, `main.sh`, which will execute the example. Each example has
multiple options. Running the script with
no arguments will display a desciption of the example and a
detailed list of the options available.

npm scripts are also available for each of these examples
in `package.json`. For example,

```
./src/ast/main.sh
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

### Code Documentation

The code documentation is in [docco](http://ashkenas.com/docco/) format and can be generated with:

```
npm run docco
```

The documentation is then at `./docs/index.html` or see it [here](https://sabnf.com/docs/apg-js-examples/) at the [APG](https://sabnf.com/) website.
