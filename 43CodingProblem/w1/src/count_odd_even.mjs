function countOddEven(input) {
    let [n, a] = input.split('\n')
    n = parseInt(n)
    a = a.split(' ').map(value => parseInt(value))
    let odd = a.filter(value => value % 2).length
    return `${odd} ${n - odd}`
}

console.log('==========================')
input = `6
2 3 4 3 7 1`

console.log(countOddEven(input))

export default countOddEven