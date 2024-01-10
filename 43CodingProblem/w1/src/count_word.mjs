function countWord(input) {
    let res = input.split(/\s+/gi).filter(e => e !== '')
    return res.length
}

console.log('==========================')
input = `   Hanoi University Of Science and Technology
School of Information and Communication Technology

`

console.log(countWord(input))

export default countWord