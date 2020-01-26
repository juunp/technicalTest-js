import sinon = require('sinon');
import assert = require('assert');
import fs = require('fs');
import mapper = require('../../lib/mapper');
import courtepaille = require('../courtepaille');
import { main } from '../main';
import assertAsync = require('../../lib/assertAsync');

const pfs = fs.promises;

describe('main function', () => {
    var sandbox = sinon.createSandbox();
    beforeEach(() => {
        sandbox.spy(mapper, 'readLines');
        sandbox.spy(mapper, 'toMap');
        sandbox.spy(courtepaille, 'findMin');
        sandbox.stub(pfs, 'readFile').resolves('ok');
    })
    
    afterEach(() => {
        sandbox.restore();
    })

    it('checks if filepath is valid', () => {
        assert.throws(() => {
            main('');
        }, err => {
            return err instanceof Error && /filePath incorrect/.test(err.toString());
        })
        assert.throws(() => {
            main(null);
        }, err => {
            return err instanceof Error && /filePath incorrect/.test(err.toString());
        })
        assert.throws(() => {
            main(undefined);
        }, err => {
            return err instanceof Error && /filePath incorrect/.test(err.toString());
        })
    })

    it('open a file', async () => {
        main('filePath');
        assertAsync.assertThrowsAsync(courtepaille.findMin, /invalid/);
    })

    it('open a file but fails', async () => {
        sandbox.restore();
        sandbox.stub(pfs, 'readFile').rejects('ok');
        main('filePath');
        assertAsync.assertThrowsAsync(pfs.readFile, /ok/);
    })

    it('calls functions after opening a file', async () => {
        main('filePath');
        assertAsync.spyAsync(mapper.readLines);
        assertAsync.spyAsync(mapper.toMap);
        assertAsync.spyAsync(courtepaille.findMin);
        assertAsync.assertThrowsAsync(courtepaille.findMin, /invalid/);
    })
})