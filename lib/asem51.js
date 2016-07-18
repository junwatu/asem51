//ES6
'use strict';

const spawn = require('child_process').spawn;
const minimist = require('minimist');
const asembin_default = 'asem';
const options_default = '--columns';

class ASEM51 {

    constructor() { }

    static asyncAsem(args) {
        let argv = minimist(args.slice(2), {
            boolean: ['o', 'v'],
            default: { v: false, o: false }
        })

        let asembin = process.env.ASEM51 || asembin_default;
        let file = argv['_'][0];
        let options = options_default;
        let argopts = [];

        argopts.push(options_default);

        // TODO: should check long version option
        if (argv['i']) {
            options = argopts.push(`-i ${argv['i']}`);
        }

        if (argv['d']) {
            options = argopts.push(`-d ${argv['d']}`);
        }

        if (argv['v'] == true) {
            options = argopts.push('-v');
        }

        if (argv['o'] == true) {
            options = argopts.push('-o');
        }

        argopts.push(file);

        return new Promise((resolve, reject) => {
            let message = [];

            if (file != undefined) {
                let asem = spawn(asembin, argopts);

                asem.on('error', err => reject(err.toString()));
                asem.stdout.on('data', (data) => {
                    if (data) {
                        message.push({ 'verbose': data.toString().replace(/[\n\t\r]/g, "") });
                    }
                });
                asem.stderr.on('data', (data) => {
                    message.push(ASEM51.parseError(file, data.toString()));
                });

                asem.on('close', () => {
                    //console.log(message);
                    resolve(message);
                })
            } else {
                let asem = spawn(asembin);
                asem.on('error', err => reject(err.toString()));
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
            errMessageObj.message = errMessage.trim().replace(/[\n\t\r]/g, "");
            errMessageArray.push(errMessageObj);
        } else {
            errMessageArray.push({ "error": err });
        }
        return errMessageArray;
    }
}

module.exports = ASEM51;