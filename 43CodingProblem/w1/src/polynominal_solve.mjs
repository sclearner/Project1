function polynominalSolve(input) {
    let a, b, c;
    [a, b, c] = input.split(' ').map(Number);
    if (a === 0) {
        if (b === 0) {
            if (c === 0) console.log("ALL REAL NUMBER");
            else console.log("NO SOLUTION");
        }
        else console.log((-1.0 * c / b).toFixed(2));
    }
    else {
        let delta = b * b - 4 * a * c;
        if (delta < 0) {
            console.log("NO SOLUTION");
        }
        else if (delta === 0) {
            console.log((-b * 1.0 / (2 * a)).toFixed(2));
        }
        else {
            console.log(((-b - Math.sqrt(delta)) / (2 * a)).toFixed(2), ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(2));
        }
    }
}

console.log('==========================')
input = `1 1 8`

polynominalSolve(input)

export default polynominalSolve
