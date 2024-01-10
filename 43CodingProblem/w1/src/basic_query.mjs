import ReadLine from "../../general/readline.mjs"

function findMaxSegments(a, i, j) {
    return Math.max(...(a.slice(i-1, j)))
}

function findMax(a) {
    return Math.max(...a)
}

function findMin(a) {
    return Math.min(...a)
}

function sum(a) {
    return a.reduce((sum, value) => sum + value, 0)
}

function basicQuery(input) {
    let inp = new ReadLine(input)
    let n;
    let a;
    n = parseInt(inp.readLine());
    a = inp.readLine().split(' ').map(e => parseInt(e))

    let s = inp.readLine();
    if (s !== "*") return 0;

    while (s !== "***") {
        s = inp.readLine();
        let ss = s.split(" ");
        let func = ss[0];
        if (func === "find-max") console.log(findMax(a));
        else if (func === "find-min") console.log(findMin(a));
        else if (func === "sum") console.log(sum(a));
        else if (func === "find-max-segment") {
            let i = parseInt(ss[1]);
            let j = parseInt(ss[2]);
            if (i <= j && j <= n) console.log(findMaxSegments(a, i, j));
        }
    }
}

console.log('==========================')
input = `5
1 4 3 2 5
*
find-max
find-min
find-max-segment 1 3
find-max-segment 2 5
sum
***`

basicQuery(input)

export default basicQuery