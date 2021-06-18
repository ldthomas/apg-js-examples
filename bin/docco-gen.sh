#!/bin/bash
docco -l classic index.md README.md LICENSE.md \
 ./src/*.js \
 ./src/apg-api/*.js \
 ./src/apg-conv-api/*.js \
 ./src/apg-exp/*.js \
 ./src/apg-lib/*.js \
 ./src/ast/*.js \
 ./src/back-reference/*.js \
 ./src/execute-rule/*.js \
 ./src/ini-file/*.js \
 ./src/look-ahead/*.js \
 ./src/look-behind/*.js \
 ./src/odata/*.js \
 ./src/substrings/*.js \
 ./src/trace/*.js \
 ./src/udt/*.js
exit 0 
