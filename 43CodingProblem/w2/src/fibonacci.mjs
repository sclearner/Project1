function fibonacci(input) {
    let n = parseInt(input)
    let a = new Array(n).fill(0)
    a[1] = 1
    for (let i=2; i<n; i++) a[i] = a[i-1] + a[i-2]
    return a[n-1]
}

console.log('==========================')
input = `9`

console.log(fibonacci(input))

export default fibonacci