import assert = require('assert');
import mapper = require('../mapper');

describe('readLines function', function() {
    it('split text into array of strings on line break \r\n', () =>{
        const str = `a
bit of
text`;
        const lines = mapper.readLines(str);
        assert.strictEqual(lines.length, 3);
        assert.strictEqual(lines[0], 'a');
        assert.strictEqual(lines[1], 'bit of');
        assert.strictEqual(lines[2], 'text');

        const str2 = 'one line';
        const lines2 = mapper.readLines(str2);
        assert.strictEqual(lines2.length, 1);
        assert.strictEqual(lines2[0], 'one line');
    })

    it('also split text into array of strings on line break \n', function() {
        const str = 'a\nb';
        const lines = mapper.readLines(str);
        assert.strictEqual(lines.length, 2);
        assert.strictEqual(lines[0], 'a');
        assert.strictEqual(lines[1], 'b');
    })
});

describe('toInt function', () =>{
    it('parse to int every item in an array', function() {
        const strs = ["18", "45"];
        const ints = mapper.toInt(strs);
        assert.strictEqual(ints.length, strs.length);
        assert.strictEqual(ints[0], 18);
        assert.strictEqual(ints[1], 45);

    })
})

describe('toMap function', () => {
    it('create a map from array of strings', () => {
        const strs = ["10", "mauve 100", "orange 500", "gris 40"];
        const map = mapper.toMap(strs);
        assert.strictEqual(map.size, strs.length - 1);
        assert.strictEqual(map.get(100), "mauve");
        assert.strictEqual(map.get(500), "orange");
        assert.strictEqual(map.get(40), "gris");

    })
})

describe('toNetworkObject function', () => {
    it('creates a network obj', () => {
        
    const strs = ["6 7", "1 3", "1 2", "1 4", "2 5", "1 7", "4 11", "5 8"];
    const network = mapper.toNetworkObject(strs);
    assert.strictEqual(network.cables, 6);
    assert.strictEqual(network.minSecond, 1);
    assert.strictEqual(network.maxSecond, 11);
    assert.strictEqual(network.planning.length, 7);
    assert.strictEqual(network.planning[0][0], 1);
    assert.strictEqual(network.planning[0][1], 3);
    
    assert.strictEqual(network.planning[1][0], 1);
    assert.strictEqual(network.planning[1][1], 2);

    
    assert.strictEqual(network.planning[2][0], 1);
    assert.strictEqual(network.planning[2][1], 4);

    
    assert.strictEqual(network.planning[3][0], 2);
    assert.strictEqual(network.planning[3][1], 5);

    
    assert.strictEqual(network.planning[4][0], 1);
    assert.strictEqual(network.planning[4][1], 7);

    
    assert.strictEqual(network.planning[5][0], 4);
    assert.strictEqual(network.planning[5][1], 11);

    
    assert.strictEqual(network.planning[6][0], 5);
    assert.strictEqual(network.planning[6][1], 8);
    
    })
})