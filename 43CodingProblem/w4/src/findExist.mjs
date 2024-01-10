const appear = new Set();

function findExist(input) {
    const [n, arr] = input.split('\n').map(e => e.split(' ').map(Number));
    for (let i = 0; i < n; i++) {
        if (appear.has(arr[i])) {
            console.log(1);
        } else {
            appear.add(arr[i]);
            console.log(0);
        }
    }
}

console.log('==========================')
input =  `5
1 4 3 1 4`

findExist(input)

export default findExist
