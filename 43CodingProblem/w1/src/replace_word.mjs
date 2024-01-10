import ReadLine from "../../general/readline.mjs"

function replaceWord(input) {
    let inp = new ReadLine(input)
    let oldWord = inp.readLine()
    let newWord = inp.readLine()
    let sentence = inp.readLine()
    return sentence.replaceAll(oldWord, newWord)
}

console.log('==========================')
input = `AI
Artificial Intelligence
Recently, AI is a key technology. AI enable efficient operations in many fields.
`

console.log(replaceWord(input))

export default replaceWord