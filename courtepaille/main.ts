import fs = require('fs');
import mapper = require('../lib/mapper');
import courtepaille = require('./courtepaille');

export function main (filePath)  {
    if (filePath === undefined || filePath === null || filePath.length === 0) {
        throw new Error("filePath incorrect");
    }
    //use promises instead of callbacks
    const pfs = fs.promises;
    let open = pfs.readFile(filePath, 'utf-8');
    let res = open.then(res => {
        //get an array of lines
        let lines: string[] = mapper.readLines(res);
        //convert lines to map
        let map: Map<number, string> = mapper.toMap(lines);
        let min = courtepaille.findMin(map);
        console.log("Output: " + min);
    });
    res.catch(err => {console.error('error: cannot understand input content')})
    open.catch(err => {console.error('error: problem with file')});
}

//we either use a file from command line "npm --file=X run courtepaille"
let filePath = process.env.npm_config_file || './courtepaille/input/input1.txt';
main(filePath);