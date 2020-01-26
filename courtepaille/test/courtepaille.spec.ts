import assert = require('assert');
import courtepaille = require('../courtepaille');

describe('courtepaille findMin function', () => {
    it('checks validity of input', () => {
        assert.throws(() => {
            courtepaille.findMin(null);
        }, err => { 
            return err instanceof Error && /invalid input/.test(err.toString()); 
        });

        assert.throws(() => {
            courtepaille.findMin(undefined);
        }, err => {
            return err instanceof Error && /invalid input/.test(err.toString()); 
        });
    })
    it('checks if partipants are enough', () => {
        let map = new Map();
        map.set(12, "abcdesf");
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /participants should be between 10 and 100/.test(err.toString());
        });
    })

    it('checks if partipants are too many', () => {
        let map = new Map();
        for (let i = 10; i < 140; i++){
            map.set(i, "agoprje");
        }
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /participants should be between 10 and 100/.test(err.toString());
        });
    })

    it('checks if sticks are greater than 10', () => {
        let map =  new Map();
        for (let i = 0; i < 25; i++){
            map.set(i, "agoprje");
        }
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /stick should measure between 10 and 1000/.test(err.toString());
        });

    })

    it('checks if sticks are less than 1000', () => {
        let map =  new Map();
        for (let i = 10; i < 25; i++){
            map.set(i, "agoprje");
        }
        map.set(1155, "abcdesf");
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /stick should measure between 10 and 1000/.test(err.toString());
        });
    })

    it('checks if name length is superior to 5', () => {
        let map =  new Map();
        for (let i = 10; i < 25; i++){
            map.set(i, "ago");
        }
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /name length should be between 5 and 10/.test(err.toString());
        });
    })

    it('checks if name is inferior to 10', () => {
        let map =  new Map();
        for (let i = 10; i < 25; i++){
            map.set(i, "thisisaverylongname");
        }
        assert.throws(() => {
            courtepaille.findMin(map);
        }, err => {
            return err instanceof Error && /name length should be between 5 and 10/.test(err.toString());
        });
    })

    it('finds name linked to min key', () => {
        let map =  new Map();
        map.set(10, "minus");
        map.set(50, "middle");
        map.set(49, "middle");
        map.set(35, "middle");
        map.set(15, "middle");
        map.set(64, "middle");
        map.set(80, "middle");
        map.set(67, "middle");
        map.set(82, "middle");
        map.set(100, "maximus");

        let min = courtepaille.findMin(map);
        assert.equal(min, "minus");

    })
})