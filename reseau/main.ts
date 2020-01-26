import fs = require('fs');
import mapper = require('../lib/mapper');
import reseau = require('./reseau');


export function main(filePath) {
    if (filePath === undefined || filePath === null || filePath.length === 0) {
        throw new Error("filePath incorrect");
    }
    //use promises instead of callbacks
    const pfs = fs.promises;
    let open = pfs.readFile(filePath, 'utf-8');
    open.catch(err => { console.error('error: invalid input'); });
    let res = open.then(res => {
            //Get array of lines
            let lines = mapper.readLines(res);
            //get object network
            let network = mapper.toNetworkObject(lines);
            //get result
            let result = reseau.plan(network);
            console.log("Output: " + result);
            
        }
    );
    res.catch(err => { console.error('error: invalid input'); });
}

//we either use a file from command line "npm --file=X run network"
var filePath = process.env.npm_config_file || './reseau/input/input1.txt';
main(filePath);

