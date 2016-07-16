//ES6
'use strict';

class ASEM51 {

    constructor() { }

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