function threeDigitDivisible(input) {
    //Initialize variables
    let [n] = input.split('\n')
    n = parseInt(n)

    let result = []
    //First number
    let i = 100 /~ n * n + (100 % n) ? n : 0
    for (;i < 1000; i+=n) {
        result.push(i)
    }
    return result.join(' ')
}

console.log('==========================')
input = `200`
console.log(threeDigitDivisible(input))

export default threeDigitDivisible