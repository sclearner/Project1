const visited = [];
const graph = new Map();
const result = [];

function BFS(start) {
    const ciu = [];
    ciu.push(start);
    visited[start] = true;

    while (ciu.length > 0) {
        let x = ciu.shift();
        result.push(x)

        for (let i of graph.get(x)) {
            if (!visited[i]) {
                ciu.push(i);
                visited[i] = true;
            }
        }
    }
}

function bfsList(input) {
    const [[n, m], ...edgesArray] = input.split('\n').map(e => e.split(' ').map(Number))

    for (let i = 0; i < n; i++) {
        visited.push(false);
    }
    for (let i = 0; i < m; i++) {
        const a = edgesArray[i][0];
        const b = edgesArray[i][1];
        if (!graph.has(a)) {
            graph.set(a, []);
        }
        if (!graph.has(b)) {
            graph.set(b, []);
        }
        graph.get(a).push(b);
        graph.get(b).push(a);
    }

    for (let i = 0; i < n; i++) {
        if (!graph.has(i+1)) continue
        const res = graph.get(i+1)
        graph.set(i+1, res.sort((a, b) => a - b));
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) BFS(i);
    }

    console.log(result.join(' '))
}

bfsList(`6 7
2 4
1 3
3 4
5 6
1 2
3 5
2 3`)

export default bfsList
