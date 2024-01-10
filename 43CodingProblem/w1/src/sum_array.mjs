function sumArray(input) {
    //Initialize variables
    let [n, a] = input.split('\n')
    a = a.split(' ').map(value => parseInt(value))
    
    return a.reduce((sum, value) => sum + value, 0)
}

let input = `4
1 2 3 4`
console.log(sumArray(input))

export default sumArray;