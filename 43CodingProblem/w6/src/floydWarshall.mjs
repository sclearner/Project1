const graph = [];
const result = [];

function floydWarshall(n, m, edges) {
    for (let i = 0; i <= n; i++) {
        let row = [];
        for (let j = 0; j <= n; j++) {
            if (i === j) row.push(0);
            else row.push(Number.MAX_SAFE_INTEGER);
        }
        graph.push(row);
    }

    for (let i = 0; i < m; i++) {
        let [u, v, w] = edges[i];
        graph[u][v] = w;
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (graph[i][j] > graph[i][k] + graph[k][j]) {
                    graph[i][j] = graph[i][k] + graph[k][j];
                }
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        let row = []
        for (let j = 1; j <= n; j++) {
            row.push(graph[i][j] === Number.MAX_SAFE_INTEGER ? -1: graph[i][j])
        }
        result.push(row.join(' '))
    }
    console.log(result.join('\n'))
}

function pairShortestPath(input) {
    const lines = input.trim().split('\n');
    const [n, m] = lines[0].split(' ').map(Number);
    let edges = [];
    for (let i = 1; i <= m; i++) {
        edges.push(lines[i].split(' ').map(Number));
    }
    floydWarshall(n, m, edges);
}

const input = `
4 9
1 2 9
1 3 7
1 4 2
2 1 1
2 4 5
3 4 6
3 2 2
4 1 5
4 2 8
`;

pairShortestPath(input)

export default pairShortestPath
