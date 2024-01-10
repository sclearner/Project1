import ReadLine from '../../general/readline.mjs';

const relation = new Map();
const descendant_count = new Map();
const generation_count = new Map();

function descendant(name) {
    if (descendant_count.has(name)) {
        return descendant_count.get(name);
    }

    if (!relation.has(name)) {
        descendant_count.set(name, 0);
        return 0;
    }

    let result = 0;

    for (const child of relation.get(name)) {
        result += 1 + descendant(child);
    }

    descendant_count.set(name, result);
    return result;
}

function generation(name) {
    if (generation_count.has(name)) {
        return generation_count.get(name);
    }

    if (!relation.has(name)) {
        generation_count.set(name, 0);
        return 0;
    }

    let result = -1;

    for (const child of relation.get(name)) {
        const gen = generation(child) + 1;
        if (gen > result) {
            result = gen;
        }
    }

    generation_count.set(name, result);
    return result;
}

function getInput(inp) {
    let line
    while (line !== '***') {
        line = inp.readLine()
        const [child, parent] = line.split(' ');
        if (!relation.has(parent)) {
            relation.set(parent, []);
        }
        relation.get(parent).push(child);
    }
}

function output(inp) {
    let line
    while (line !== '***') {
        line = inp.readLine()
        const [cmd, name] = line.split(' ');
        if (cmd === 'descendants') {
            console.log(descendant(name));
        } else if (cmd === 'generation') {
            console.log(generation(name));
        }
    }
}

function familyTree(input) {
    const inp = new ReadLine(input)
    getInput(inp)
    output(inp)
}

console.log('==========================')
input =  `Peter Newman
Michael Thomas
John David
Paul Mark
Stephan Mark
Pierre Thomas
Mark Newman
Bill David
David Newman
Thomas Mark
***
descendants Newman
descendants Mark
descendants David
generation Mark
***`

familyTree(input)

export default familyTree
