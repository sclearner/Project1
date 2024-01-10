const visited = [];
const graph = new Map();
const log = []

function DFS(start) {
    visited[start] = true;
    log.push(start);
    for (let i of graph.get(start)) {
        if (!visited[i]) DFS(i);
    }
}

function dfsList(input) {
    const [[n, m], ...edgesArray] = input.split('\n').map(e => e.split(' ').map(Number))

    for (let i = 0; i < n; i++) {
        visited.push(false)
    }

    for (let i = 0; i < m; i++) {
        const a = edgesArray[i][0]
        const b = edgesArray[i][1]
        if (!graph.has(a)) {
            graph.set(a, [])
        }
        if (!graph.has(b)) {
            graph.set(b, [])
        }
        graph.get(a).push(b)
        graph.get(b).push(a)
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) DFS(i)
    }

    console.log(log.join(' '))
}

dfsList(`7 12
1 2
1 3
2 3
2 4
2 7
3 5 
3 7
4 5
4 6
4 7
5 6
5 7`)

export default dfsList
