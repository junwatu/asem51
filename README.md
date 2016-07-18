#ASEM51

[![Build Status](https://travis-ci.org/junwatu/asem51.svg?branch=master)](https://travis-ci.org/junwatu/asem51)

This is a node.js wrapper for [asem-51](http://plit.de/asem-51)

##Install

**LINUX**

Before use this package you should install ASEM-51 from http://plit.de/asem-51

```
npm install --save asem51
```

##Usage 

To compile assembly for 8051 in file `main.a51` you can type

```
$ asem51 -v main.a51
```

> WARNING: This cli wrapper only tested on Linux but if you want use the API just read the API description below. Thanks. 

##API

**asyncAsem(args)**

This function will take arguments exactly like the arguments that you type with cli `asem51` and this function will return parsed error if there are errors on your assembly code.


```
[[ { file: 'test/main.a51',
    line: '1',
    column: '6',
    message: 'illegal operand' },
  { file: 'test/main.a51',
    line: '2',
    column: '10',
message: 'no END statement found' } ]]
```

with `-v` verbose option the output with error

```
[ { verbose: 'MCS-51 Family Macro Assembler ASEM-51 V1.3             2 errors detected' },
  [ { file: 'test/main.a51',
      line: '1',
      column: '6',
      message: 'illegal operand' },
    { file: 'test/main.a51',
      line: '2',
      column: '10',
      message: 'no END statement found' } ] ]

```

##License

MIT
