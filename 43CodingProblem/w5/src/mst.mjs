class Edge {
    constructor(u, v, w) {
        this.u = u;
        this.v = v;
        this.w = w;
    }

    compare(b) {
        let a = this;
        if (a.w === b.w) {
            if (a.u === b.u) return a.v - b.v;
            else return a.u - b.u;
        }
        return a.w - b.w;
    }
}

let r = [];
let parent = [];
let ciu = [];

function make_set(x) {
    parent[x] = x;
    r[x] = 1;
}

function find(x) {
    if (x !== parent[x]) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

function union_set(u, v) {
    let x = find(u);
    let y = find(v);
    if (x === y) return;
    if (r[x] > r[y]) {
        parent[x] = y;
    } else {
        parent[y] = x;
        if (r[x] === r[y]) r[y] = r[x] + 1;
    }
}

function mst(input) {
    let [[n, m], ...edgesArray] = input.split('\n').map(e => e.split(' ').map(Number))

    for (let i = 0; i <= n; i++) {
        r.push(0);
        parent.push(0);
        if (i) make_set(i);
    }

    
    for (let i = 0; i < m; i++) {
        const [u, v, w] = edgesArray[i]
        ciu.push(new Edge(u, v, w));
    }

    ciu.sort((a, b) => a.compare(b));

    let result = 0;
    let resultEdge = 0;

    while (n - 1 && ciu.length > 0) {
        let curr = ciu.shift();
        if (find(curr.u) === find(curr.v)) {
            continue;
        }
        union_set(curr.u, curr.v);
        resultEdge += 1;
        n--;
        result += curr.w;
    }

    console.log(result);
}

mst(`5 8
1 2 1
1 3 4
1 5 1
2 4 2
2 5 1
3 4 3
3 5 3
4 5 2
`)

export default mst
