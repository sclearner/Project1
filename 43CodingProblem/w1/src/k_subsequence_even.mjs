import ReadLine from "../../general/readline.mjs";

function sumK(prefixSum, i, j) {
    return prefixSum[j] - prefixSum[i];
}

function kSubsequenceEven(input) {
    let inp = new ReadLine(input)
    let n, k, res = 0;
    let a;
    let prefixSum = [];
    [n, k] = inp.readLine().split(' ').map(Number);
    a = inp.readLine().split(' ').map(Number);
    prefixSum.push(0);
    for (let i = 1; i <= n; i++) {
        prefixSum.push(prefixSum[i-1] + a[i-1]);
    }
    for (let i = 0; i + k <= n; i++) {
        if (sumK(prefixSum, i, i + k) % 2 == 0) res += 1;
    }
    console.log(res);
}

console.log('==========================')
input = `6 3
2 4 5 1 1 2`

kSubsequenceEven(input)

export default kSubsequenceEven

