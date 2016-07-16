//ES6
'use strict';

const spawn = require('child_process').spawn;

class ASEM51 {

    constructor() { }

    static asyncAsem(argv) {

        let file = argv['_'][0];

        return new Promise((resolve, reject) => {

            if (file != undefined) {
                let asem = spawn('asem', ['--columns', file]);

                asem.on('error', err => reject(err));
                asem.stdout.on('data', (data) => {
                    resolve(data);
                });
                asem.stderr.on('data', (data) => {
                    resolve(ASEM51.parseError(file, data.toString()));
                });
            } else {
                let asem = spawn('asem');
                asem.on('error', err => reject(err));
                asem.stdout.on('data', data => resolve(data.toString()));
                asem.stderr.on('data', data => resolve(data.toString()));
            }
        })
    }

    static parseError(fileName, stderr) {
        let errMessageArray = [];
        let errAllArray = stderr.split('\n').filter(n => n != '');
        let isError = errAllArray[0].split(' ').filter(n => n == '@@@@@');

        if (isError.length > 1) {
            errMessageArray.push({ "error": stderr });
        } else {
            errAllArray.forEach((element, index, array) => ASEM51.parseErrorElement(fileName, element, errMessageArray));
        }
        return errMessageArray;
    }

    static parseErrorElement(fileName, err, errMessageArray) {
        let errAll = err.split(':');
        let errMessage = errAll[1];

        /**
         * Parse error message with RegEx
         * ex: "file.a51(1,10): error message" to ['1', '10] 
         */
        if (errAll[1]) {
            let lineCols = errAll[0].match(/\((.*)\)/)[1];
            let lineCol = lineCols.split(",");
            let errMessageObj = {};

            errMessageObj.file = fileName;
            errMessageObj.line = lineCol[0];
            errMessageObj.column = lineCol[1];
            errMessageObj.message = errMessage;
            errMessageArray.push(errMessageObj);
        } else {
            errMessageArray.push({ "error": err });
        }
        return errMessageArray;
    }
}

module.exports = ASEM51;