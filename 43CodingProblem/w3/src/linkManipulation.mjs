import ReadLine from "../../general/readline.mjs";

class Node {
    constructor(label) {
        this.label = label;
        this.next = null;
    }
}

function makeNode(x) {
    return new Node(x);
}

function isExist(h, x) {
    let p = h;
    while (p !== null) {
        if (p.label === x) return true;
        p = p.next;
    }
    return false;
}

function addFirst(h, x) {
    if (!isExist(h, x)) {
        const p = makeNode(x);
        p.next = h;
        return p;
    }
    return h;
}

function addLast(h, x) {
    if (h === null) return makeNode(x);
    if (!isExist(h, x)) {
        let curr = h;
        while (curr.next !== null) {
            curr = curr.next;
        }
        curr.next = makeNode(x);
    }
    return h;
}

function addBefore(h, u, v) {
    if (h === null) return null;
    if (isExist(h, v) && !isExist(h, u)) {
        let curr = h, pos = null;
        while (curr.next !== null) {
            if (curr.next.label === v) {
                pos = curr;
                break;
            }
            curr = curr.next;
        }
        if (pos === null) return h;
        const p = makeNode(u);
        p.next = pos.next;
        pos.next = p;
    }
    return h;
}

function addAfter(h, u, v) {
    if (h === null) return null;
    if (isExist(h, v) && !isExist(h, u)) {
        let curr = h;
        while (curr !== null) {
            if (curr.label === v) break;
            curr = curr.next;
        }
        if (curr === null) return h;
        const p = makeNode(u);
        if (curr.next !== null) {
            p.next = curr.next;
        }
        curr.next = p;
    }
    return h;
}

function removeX(h, x) {
    if (h === null) return null;
    if (h.label === x) {
        const p = h.next;
        return p;
    }
    h.next = removeX(h.next, x);
    return h;
}

function reverse(h) {
    if (h === null) return null;
    if (h.next === null) return h;
    const p = h.next.next;
    const p1 = h.next;
    h.next = null;
    p1.next = h;
    if (p === null) return p1;
    const newHead = reverse(p);
    p.next = p1;
    return newHead;
}

function print(h) {
    if (h === null) return [];
    return [h.label, ...print(h.next)]
}

function linkManipulation(input) {
    let list = null;
    let inp = new ReadLine(input)
    const n = parseInt(inp.readLine());
    let line = inp.readLine().split(' ').map(Number)
    for (let i = 0; i < n; i++) {
        const x = line[i];
        list = addLast(list, x);
    }

    let func, u, v;
    while (func !== '#') {
        [func, u, v] = inp.readLine().split(' ')
        if (func === 'addlast') {
            u = parseInt(u)
            list = addLast(list, u);
        } else if (func === 'addfirst') {
            u = parseInt(u)
            list = addFirst(list, u);
        } else if (func === 'addafter') {
            u = parseInt(u)
            v = parseInt(v)
            list = addAfter(list, u, v);
        } else if (func === 'addbefore') {
            u = parseInt(u)
            v = parseInt(v)
            list = addBefore(list, u, v);
        } else if (func === 'remove') {
            u = parseInt(u)
            list = removeX(list, u);
        } else if (func === 'reverse') {
            list = reverse(list);
        }
    }

    console.log(print(list).join(' '));
}

console.log('==========================')
input =  `5
5 4 3 2 1
addlast 3
addlast 10
addfirst 1
addafter 10 4
remove 1
#`

linkManipulation(input)
export default linkManipulation
