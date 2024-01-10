function C(dp, n, k) {
    if (k === 0 || k === n) {
        dp[n][k] = 1;
        return dp[n][k];
    }
    if (dp[n][k] !== 0) return dp[n][k];
    dp[n][k] = C(dp, n - 1, k - 1) + C(dp, n - 1, k);
    if (dp[n][k] >= 1000000007) dp[n][k] -= 1000000007;
    return dp[n][k];
}

function computeC(input) {
    let dp = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
    let n, k;
    [k, n] = input.split(" ").map(Number);
    console.log(C(dp, n, k));
}

console.log('==========================')
input = `3 5`

computeC(input)

export default computeC