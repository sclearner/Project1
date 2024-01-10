function backtrack(a, n, k) {
    if (k === n) {
        console.log(a.reduce((res, e) => `${res}${e}`, ''));
        return;
    }
    a[k] = 0;
    backtrack(a, n, k + 1);
    if (k == 0) {
        a[k] = 1;
        backtrack(a, n, k + 1);
    }
    else if (a[k-1] != 1) {
        a[k] = 1;
        backtrack(a, n, k + 1);
    }
}

function binaryNotConsecutive(input) {
    let n = parseInt(input)
    let a = new Array(n).fill(0);
    backtrack(a, n, 0)
}

console.log('==========================')
input = `3`

binaryNotConsecutive(input)

export default binaryNotConsecutive