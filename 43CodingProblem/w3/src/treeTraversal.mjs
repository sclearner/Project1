import ReadLine from "../../general/readline.mjs";

class Node {
    constructor(x) {
        this.label = x
        this.firstChild = null
        this.nextSibling = null
    }
}

function isExist(node, x) {
    if (node == null) return false
    if (node.label == x) return true
    return isExist(node.firstChild, x) || isExist(node.nextSibling, x)
}

function insert(node, u, v) {
    if (node == null) return null
    if (isExist(node, u)) return node;
    if (node.label == v) {
        let q = node.firstChild
        if (q == null) node.firstChild = new Node(u)
        else {
            while (q.nextSibling != null) q = q.nextSibling
            q.nextSibling = new Node(u)
        }
        return node
    }
    for (let q = node.firstChild; q != null; q = q.nextSibling) q = insert(q, u, v)
    return node
}

function postOrder(h) {
    if (h == null) return []
    let a = []
    for (let p = h.firstChild; p != null; p = p.nextSibling) a = [...a, ...postOrder(p)]
    a.push(h.label)
    return a
}

function preOrder(h) {
    if (h == null) return []
    let a = [h.label]
    for (let p = h.firstChild; p != null; p = p.nextSibling) a = [...a, ...preOrder(p)]
    return a
}

function inOrder(h) {
    if (h == null) return []
    let a = [...inOrder(h.firstChild), h.label]
    if (h.firstChild != null) {
        for (let p = h.firstChild.nextSibling; p != null; p = p.nextSibling) a = [...a, ...inOrder(p)]
    }
    return a
}



function treeTraversal(input) {
    let inp = new ReadLine(input)
    let tree;
    let s;
    while (s !== "*") {
        s = inp.readLine();
        let ss = s.split(" ");
        let func = ss[0];
        switch (func) {
            case "MakeRoot":
                tree = new Node(parseInt(ss[1]))
                break
            case "Insert":
                tree = insert(tree, parseInt(ss[1]), parseInt(ss[2]))
                break
            case "InOrder":
                console.log(inOrder(tree).join(' '))
                break
            case "PostOrder":
                    console.log(postOrder(tree).join(' '))
                    break
            case "PreOrder":
                        console.log(preOrder(tree).join(' '))
                        break
                            
        }
    }
}

console.log('==========================')
input = `MakeRoot 10
Insert 11 10
Insert 1 10
Insert 3 10
InOrder
Insert 5 11
Insert 4 11
Insert 8 3
PreOrder
Insert 2 3
Insert 7 3
Insert 6 4
Insert 9 4
InOrder
PostOrder
*`

treeTraversal(input)

export default treeTraversal