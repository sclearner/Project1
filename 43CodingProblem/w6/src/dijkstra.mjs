class PriorityQueue {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator;
    }

    enqueue(item) {
        this.data.push(item);
        this.data.sort(this.comparator);
    }

    dequeue() {
        return this.data.shift();
    }

    isEmpty() {
        return this.data.length === 0;
    }
}

function dijkstra(input) {
    const lines = input.trim().split('\n');
    const [n, m] = lines[0].split(' ').map(Number);

    const graph = new Map();
    for (let i = 1; i <= m; i++) {
        const [u, v, w] = lines[i].split(' ').map(Number);
        if (!graph.has(u)) graph.set(u, new Map());
        graph.get(u).set(v, w);
    }

    const [s, t] = lines[m + 1].split(' ').map(Number);
    const h = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const visited = new Array(n + 1).fill(false);
    h[s] = 0;

    const ciu = new PriorityQueue((a, b) => h[a] - h[b]);
    ciu.enqueue(s);

    while (!ciu.isEmpty()) {
        const curr = ciu.dequeue();
        visited[curr] = true;

        if (curr === t) break;

        for (const [next, w] of graph.get(curr) || []) {
            if (visited[next]) continue;
            const e = h[curr] + w;
            if (e < h[next]) {
                h[next] = e;
                ciu.enqueue(next);
            }
        }
    }

    console.log(h[t] === Number.MAX_SAFE_INTEGER ? -1 : h[t]);
}

const input = `
5 7
2 5 87
1 2 97
4 5 78
3 1 72
1 4 19
2 3 63
5 1 18
1 5
`;

dijkstra(input);

export default dijkstra