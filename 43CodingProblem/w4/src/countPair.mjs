const freq = new Array(1000000).fill(0);
const arr = new Array(1000000);

function countPair(input) {
    let count = 0;
    const [[n, M], arr] = input.split('\n').map(e => e.split(' ').map(Number))

    for (let i = 0; i < n; i++) {
        count += freq[M - arr[i]];
        freq[arr[i]]++;
    }

    console.log(count);
}

countPair(`5 6
5 2 1 4 3`)

export default countPair
