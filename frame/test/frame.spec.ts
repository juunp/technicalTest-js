import assert = require('assert');
import frame = require('../frame');

describe('calculateRemainder function',  () => {
    it('checks if boards contains no more than 4 elements', () =>{
        let a = [0,0,0,0,0,0,0];
        assert.throws(() => {
            frame.calculateRemainder(a);
        }, err => {
            return err instanceof Error && /should contain 4 lines/.test(err.toString());
        });
        
    })

    it('checks if boards contains no less than 4 elements', () =>{
        var a = [0,0];
        assert.throws(() => {
            frame.calculateRemainder(a);
        }, err => {
            return err instanceof Error && /should contain 4 lines/.test(err.toString());
        });
    })

    it('checks if boards measure between 10 and 1000', () =>{
        var a = [0,0,0,0];
        assert.throws(() => {
            frame.calculateRemainder(a);
        }, err => {
            return err instanceof Error && /boards must measure between 10 and 1000/.test(err.toString());
        });
        a = [1005, 1006, 1007, 1008];
        assert.throws(() => {
            frame.calculateRemainder(a);
        }, err => {
            return err instanceof Error && /boards must measure between 10 and 1000/.test(err.toString());
        })
    })

    it('calculate remainder of each boards to make a square frame', () => {
        let a = [80,50,30,50];
        const remainder = frame.calculateRemainder(a);
        assert.equal(remainder, 90);
    })


})