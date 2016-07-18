'use strict';

import ASEM51 from '../lib/asem51';
import assert from 'assert';

const args = [null, null, '-o', '--verbose','--define=ARCH:0', 'test/main.a51'];
const errExpected = [
    { file: 'test/main.a51', line: '1', column: '6', message: 'illegal operand' },
    { file: 'test/main.a51', line: '2', column: '10', message: 'no END statement found' }
]


describe('Args Test', () => {
    it('Boolean', () => {
        ASEM51.asyncAsem(args)
            .then(data => { 
                console.log(data)
                assert.equal(data[1][0].file, errExpected[0].file);
                assert.equal(data[1][1].column, errExpected[1].column); 
            })
            .catch(err => console.log(err));
    })
})
