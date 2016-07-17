'use strict';

import ASEM51 from '../lib/asem51';
import assert from 'assert';

const args = [null, null, '-o', '-v', 'test/main.a51'];

describe('Args', () => {
    it('Test Boolean Args', () => {
        ASEM51.asyncAsem(args)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    })
})
