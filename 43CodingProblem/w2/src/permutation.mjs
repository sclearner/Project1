function backtrack(a, b, n, k) {
    if (k === n) {
        console.log(a.join(' '));
        return;
    }
    for (let i = 1; i<= n; i++) {
        if (!b[i]) {
            b[i] = true;
            a[k] = i;
            backtrack(a, b, n, k+1);
            b[i] = false;
        }
    }
}

function permutation(input) {
    let n = parseInt(input)
    let a = new Array(n).fill(0);
    let b = new Array(n+1).fill(false);
    backtrack(a, b, n, 0)
}

console.log('==========================')
input = `3`

permutation(input)

export default permutation