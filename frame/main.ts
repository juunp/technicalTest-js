import fs = require('fs');
import mapper = require('../lib/mapper');
import frame = require('./frame');

export function main(filePath) {
    if (filePath === undefined || filePath === null || filePath.length === 0) {
        throw new Error("filePath incorrect");
    }
    //use promises instead of callbacks
    const pfs = fs.promises
    let open = pfs.readFile(filePath, 'utf-8');
    open.catch(err => {console.error('error: invalid content')});
    let res = open.then(res => {
            //get array of lines
            let lines = mapper.readLines(res);
            // get array of integer
            let ints = mapper.toInt(lines);
            //calculate result
            let remainder = frame.calculateRemainder(ints);
            console.log("Output: " + remainder);
            
        }
    );
    res.catch(err => console.error('error: invalid content'))
} 

//we either use a file from command line "npm --file=X run frame"
let filePath = process.env.npm_config_file || './frame/input/input1.txt';
main(filePath);