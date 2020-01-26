import networkInterface = require('./INetwork');
const checkValues = network => {
    if (network === undefined || network === null) {
        throw new Error("invalid input");
    }
    if (network.cables < 1 || network.cables > 500) {
        throw new Error("cables stock should be between 1 and 500");
    }
    if (network.planning.length < 1 || network.planning.length > network.cables * 3) {
        throw new Error("requests should be between 1 and cables stock * 3");
    }
    if (network.minSecond > network.maxSecond) {
        throw new Error("time cannot be played with");
    }
    network.planning.forEach(element => {
        element.forEach(el => {
            if (el > 2500) {
                throw new Error("date should be inferior to 2500");
            }
            if (element[0] > element[1]) {
                throw new Error("start and end dates should be consistent");
            }
        })
    });
}

export function plan(network: networkInterface.INetwork): string {
    checkValues(network);
    var queue = addCablestoQueue(network.cables);
    var str = "";
    for (let time = network.minSecond; time <= network.maxSecond; time++) {
        if (time !== network.minSecond) {
            let stopLend = network.lendedCables.filter(lendedCable => lendedCable[0] === time).map(lendedCable => lendedCable[1]);
            queue.push(...stopLend);
        }
        let timedRequests = network.planning.filter(planning => planning[0] === time);
        for (let i = 0; i < timedRequests.length; i++) {
            if (queue.length > 0) {
                let cableIndex = queue.shift();
                str += str.length === 0 ? cableIndex : " " + cableIndex;
                network.lendedCables.push([timedRequests[i][1], cableIndex]);
            } else {
                return "pas possible";
            }
        }
    }
    return str;
}

function addCablestoQueue(cableNumber: number): number[] {
    var queue = [];
    for (let i = 1; i < cableNumber + 1; i++) {
        queue.push(i);
    }
    return queue;
}