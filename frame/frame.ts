
const checkValues = boards => {
    if (boards === undefined || boards === null) {
        throw new Error("invalid input");
    }
    if (boards.length != 4) {
        throw new Error("should contain 4 lines");
    }
    boards.forEach(element => {
        if (element < 10 || element > 1000) {
            throw new Error("boards must measure between 10 and 1000");
        }
    });
}
export function calculateRemainder(boards) {
    checkValues(boards);
    //to cut a perfect square, we need to find the shortest board
    const min = Math.min(...boards);
    let remainder = 0;
    //then for each board, we cut at the length of the shortest board
    boards.forEach(element => {
        remainder += min - element;
    });
    return Math.abs(remainder);
}