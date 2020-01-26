import networkInterface = require('../reseau/INetwork');

export function readLines(str: string): string[] { return str.match(/\r\n/) ? str.split(/\r\n/) : str.split(/\n/) };
export function toInt(lines: string[]): number[] {
    let ints = [];
    for (let i = 0; i < lines.length; i++) {
        ints[i] = parseInt(lines[i]);
    }    
    return ints;
}

export function toMap(lines: string[]): Map<number, string> {
    let map = new Map();
    for (let i = 1; i < lines.length; i++) {
        let kv = lines[i].split(/\s/);
        map.set(parseInt(kv[1]), kv[0]);
    }
    return map;
}

export function toNetworkObject(lines: string[]): networkInterface.INetwork {
    let network = {
        cables: null,
        planning: [],
        minSecond: null,
        maxSecond: null,
        lendedCables: []
    };
    for (let i = 0; i < lines.length; i++) {
        if (i === 0) {
            const line0 = lines[i].split(/\s/);
            network.cables = parseInt(line0[0]);
        } else {
            const planning = [];
            planning.push(lines[i].split(/\s/));
            for (let j = 0; j < planning.length; j++) {
                let entry = this.toInt(planning[j]);
                network.planning.push(entry);
                if (network.minSecond === null || entry[0] < network.minSecond) {
                    network.minSecond = entry[0];
                }
                if (network.maxSecond === null || entry[1] > network.maxSecond) {
                    network.maxSecond = entry[1];
                }
            }
        }
    }
    return network;
}