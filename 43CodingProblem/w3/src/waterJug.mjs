class PriorityQueue {
    constructor(cmp) {
        this.elements = [];
        this.cmp = cmp;
    }

    push(element) {
        this.elements.push(element);
        this.elements.sort(this.cmp);
    }

    pop() {
        return this.elements.shift();
    }

    empty() {
        return this.elements.length === 0;
    }
}

class SetWithComparator {
    constructor(cmp) {
        this.elements = new Set();
        this.cmp = cmp;
    }

    insert(element) {
        this.elements.add(element);
    }

    count(element) {
        let arr = Array.from(this.elements)
        for (let i in arr) {
            let value = arr[i] 
            if (JSON.stringify(element) == JSON.stringify(value)) return 1
        }
        return 0
    }
}

function maybe_happen(si, a, b, visited) {
    const result = [];

    // Add water
    if (!visited.count([a, si[1]]))
        result.push([a, si[1]]);
    if (!visited.count([si[0], b]))
        result.push([si[0], b]);

    // Remove water
    if (!visited.count([si[0], 0]))
        result.push([si[0], 0]);
    if (!visited.count([0, si[1]]))
        result.push([0, si[1]]);

    // Pour 2 to 1
    const total = si[0] + si[1];
    if (total <= a) {
        if (!visited.count([total, 0]))
            result.push([total, 0]);
    } else {
        if (!visited.count([a, total - a]))
            result.push([a, total - a]);
    }

    // Pour 1 to 2
    if (total <= b) {
        if (!visited.count([0, total]))
            result.push([0, total]);
    } else {
        if (!visited.count([total - b, b]))
            result.push([total - b, b]);
    }

    return result;
}

function bfs(a, b, c) {
    const queue = new PriorityQueue((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    const visited = new SetWithComparator((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    queue.push([[0, 0], 0]);
    visited.insert([0, 0]);

    while (!queue.empty()) {
        const [curr, depth] = queue.pop()
        const next_situation = maybe_happen(curr, a, b, visited)

        for (const iter of next_situation) {
            const dip = depth + 1;
            queue.push([iter, dip]);
            visited.insert(iter);

            if (iter[0] === c || iter[1] === c) {
                return dip;
            }
        }
    }

    return -1;
}

function waterJug(input) {
    const [a, b, c] = input.split(' ').map(Number);
    console.log(bfs(a, b, c));
}

console.log('==========================')
input = `6 8 4`

waterJug(input)

export default waterJug
