const checkValues = (courtePailleMap: Map<number, string>) => {
    if (courtePailleMap === undefined || courtePailleMap === null) {
        throw new Error('invalid input');
    }
    if (courtePailleMap.size < 10 || courtePailleMap.size > 100) {
        throw new Error("participants should be between 10 and 100")
    }
    for (let [key, value] of courtePailleMap) {
        if (value.length < 5 || value.length > 10) {
            throw new Error("name length should be between 5 and 10")
        }
        if (key < 10 || key > 1000) {
            throw new Error("stick should measure between 10 and 1000")
        }
    }
}

export function findMin(courtePailleMap: Map<number, string>): string {
    checkValues(courtePailleMap);
    //finding smallest stick
    let min = Math.min(...courtePailleMap.keys());
    //returning the name
    return courtePailleMap.get(min);
}