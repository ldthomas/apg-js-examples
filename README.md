# apg-js-examples

## Installation

Use the normal installation procedure. For example, to install locally in the current directory,

```
npm init
npm install apg-js-examples --save
cd node_modules/apg-js-examples
npm run
```

Note that `npm run` will display a list of all the example scripts.

## Description

This package contains a large set of examples of using apg-js,
the JavaScript version of APG, an ABNF Parser Generator.

Each example is in its own directory and in that directory is
a script, "main.sh", which will execute the example. Many examples
have multiple options. In these cases, running the script with
no arguments will display a desciption of the example and a
detailed list of the options available.

npm scripts are available for each of these examples.
See "package.json" for a list of available scripts.
The examples can be run with "npm run \<example\>" or by executing
the example scripts directly.

If executing the scripts directly or in with a debugger, they should be
excuted from the repository directory for correct relative path name alignment.
That is, "./src/apg-lib/main.sh" is equivalent to "npm run apg-lib".

Each of the four libraries, apg-conv-api, apg-lib, apg-api and apg-exp,
has been bundled for browser use. Consequently, the examples for
each of these libraries contains an example of browser usage.
The browser-based example file names will have a "web-" prefix.