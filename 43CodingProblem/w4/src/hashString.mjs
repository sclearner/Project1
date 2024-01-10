function hashString(input) {
    const mod = 1000000007; // Đặt giá trị mod theo yêu cầu của bài toán

    const test = input.split('\n').map((e, index) => (index == 0)? e.split(' ').map(Number): e) 
    const [[n, m], ...arr] = test

    const dp = new Array(200);
    dp[0] = 1;

    for (let i = 1; i < 200; i++) {
        dp[i] = (dp[i - 1] << 8) % m;
    }

    for (let ii = 0; ii < n; ii++) {
        const s = arr[ii];

        let result = 0;
        const g = s.length;

        for (let i = 1; i <= g; i++) {
            result = (result + dp[g - i] * s.charCodeAt(i - 1)) % m;
        }

        console.log(result);
    }
}

hashString(`4 1000
a
ab
abc
abcd`)

export default hashString;
