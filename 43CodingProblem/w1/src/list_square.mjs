function listSquare(input) {
    let n = parseInt(input)
    let result = []
    for (let i=1; i<=n; ++i) result.push(`${i} ${i*i}`)
    return result.join('\n') 
}

console.log('==========================')
input = `45`

console.log(listSquare(input))

export default listSquare