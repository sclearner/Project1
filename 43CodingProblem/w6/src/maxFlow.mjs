class Edge {
    constructor(v, w) {
        this.v = v;
        this.w = w;
    }
}

class MaxFlowComparator {
    compare(a, b) {
        if (a.w !== b.w) return a.w > b.w ? 1 : -1;
        return a.v > b.v ? 1 : -1;
    }
}

function maxFlow(input) {
    const lines = input.trim().split('\n');
    const [n, m] = lines[0].split(' ').map(Number);

    const graph = new Map();
    const s = Number(lines[1].split(' ')[0]);
    const t = Number(lines[1].split(' ')[1]);

    for (let i = 2; i <= m + 1; i++) {
        const [u, v, w] = lines[i].split(' ').map(Number);
        if (!graph.has(u)) graph.set(u, new Map());
        if (!graph.has(v)) graph.set(v, new Map());
        graph.get(u).set(v, w);
        graph.get(v).set(u, 0);
    }

    let max_flow = 0;

    while (true) {
        const trace = new Map();
        const ciu = new PriorityQueue({ comparator: new MaxFlowComparator() });
        const visited = new Set();
        let bottleneck = 0;

        ciu.enqueue(new Edge(s, Number.MAX_SAFE_INTEGER));

        while (!ciu.isEmpty()) {
            const { v: u, w: last_w } = ciu.dequeue();
            if (visited.has(u)) continue;
            visited.add(u);
            for (const [v, w] of graph.get(u)) {
                if (visited.has(v)) continue;
                if (w === 0) continue;
                const new_w = last_w > w ? w : last_w;
                ciu.enqueue(new Edge(v, new_w));
                trace.set(v, u);
                if (v === t) {
                    visited.add(t);
                    bottleneck = new_w;
                    break;
                }
            }
        }

        if (!visited.has(t)) break;
        max_flow += bottleneck;
        let v = t;
        while (v !== s) {
            const u = trace.get(v);
            graph.get(u).set(v, graph.get(u).get(v) - bottleneck);
            graph.get(v).set(u, graph.get(v).get(u) + bottleneck);
            v = u;
        }
    }
    console.log(max_flow);
}

class PriorityQueue {
    constructor(options) {
        this.options = options;
        this.data = [];
    }

    enqueue(item) {
        this.data.push(item);
        this.data.sort(this.options.comparator.compare);
    }

    dequeue() {
        return this.data.shift();
    }

    isEmpty() {
        return this.data.length === 0;
    }
}

const input = `7 12
6 7
1 7 7
2 3 6
2 5 6
3 1 6
3 7 11
4 1 7
4 2 4
4 5 5
5 1 4
5 3 4
6 2 8
6 4 10`;

maxFlow(input);

export default maxFlow