let visited = [];
let graph = new Map();
let trace = [];

function backtrack(start, n) {
    let last = trace[trace.length - 1];

    if (trace.length === n) {
        if (graph.get(last).includes(start)) {
            return 1;
        } else {
            return 0;
        }
    }

    let result = 0;
    for (let i of graph.get(last)) {
        if (!visited[i]) {
            trace.push(i);
            visited[i] = true;
            result |= backtrack(start, n);
            trace.pop();
            visited[i] = false;
        }
    }

    return result;
}

function halminton(input) {
    const lines = input.trim().split('\n');
    const T = parseInt(lines[0]);

    let currentIndex = 1;
    for (let t = 0; t < T; t++) {
        visited = [];
        graph = new Map();
        trace = [];

        const [n, m] = lines[currentIndex++].split(' ').map(Number);

        for (let i = 0; i <= n; i++) {
            visited.push(false);
        }

        for (let i = 0; i < m; i++) {
            const [a, b] = lines[currentIndex++].split(' ').map(Number);
            if (!graph.has(a)) {
                graph.set(a, []);
            }
            if (!graph.has(b)) {
                graph.set(b, []);
            }
            graph.get(a).push(b);
            graph.get(b).push(a);
        }

        trace.push(1);
        let result = backtrack(1, n);
        console.log(result);
    }
}

const input = `
2
4 4
1 2
1 3
2 4
3 4
4 3
1 2
2 3
2 4
`;

halminton(input);

export default halminton
