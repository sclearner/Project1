function calculateSimple(input) {
    let [a, b] = input.split(' ').map(value => parseInt(value))
    return [a + b, a - b, a * b, (a - a % b)/b].join(' ')
}

console.log('==========================')
input = `200 120`

console.log(calculateSimple(input))

export default calculateSimple