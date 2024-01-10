function isOpen(c) {
    return c == '(' || c == '[' || c == '{';
}

function isClose(c) {
    return c == ')' || c == ']' || c == '}';
}

function isRightClose(stack, c) {
    let current = stack.pop()
    if (current == undefined) return false;
    return (current == '(' && c == ')') || (current == '[' && c == ']') || (current == '{' && c == '}');
}

function push(stack, c) {
    stack.push(c)
}

function checkParenthesis(input) 
{ 
    let stack = []
    for (let i=0; i<input.length; i++) {
        let c = input[i]
        if (isOpen(c)) push(stack, c)
        else if (isClose(c)) {
            if (!isRightClose(stack, c)) {
                return 0
            }
        }
    }
    if (stack.length > 0) return 0
    else return 1
}

console.log('==========================')
input = `(()[][]{}){}{}[][]({[]()})`

console.log(checkParenthesis(input))

export default checkParenthesis
