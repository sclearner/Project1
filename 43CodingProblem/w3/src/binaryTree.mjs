import ReadLine from "../../general/readline.mjs";

class Node {
    constructor(label) {
        this.label = label;
        this.left = null;
        this.right = null;
    }
}

function makeNode(x) {
    return new Node(x);
}

function insert(node, x) {
    if (node === null) {
        return makeNode(x);
    }

    if (x === node.label) {
        return node;
    }

    if (x < node.label) {
        node.left = insert(node.left, x);
    } else {
        node.right = insert(node.right, x);
    }

    return node;
}

function postOrder(node) {
    if (node === null) {
        return []
    }
    return [node.label, ...postOrder(node.left), ...postOrder(node.right)]
}

function binaryTree(input) {
    let inp = new ReadLine(input)
    let tree = null
    let func, u

    while (func !== "#") {
        [func, u] = inp.readLine().split(' ')
        if (func === "insert") {
            tree = insert(tree, parseInt(u));
        }
    }

    let result = postOrder(tree).join(' ')
    console.log(result)
}

console.log('==========================')
input =  `insert 20
insert 10
insert 26
insert 7
insert 15
insert 23
insert 30
insert 3
insert 8
#`

binaryTree(input)

export default binaryTree
