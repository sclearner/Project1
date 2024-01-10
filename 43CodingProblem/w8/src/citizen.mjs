function citizen(input) {
    function timeConvert(time_point) {
        const [year, month, day] = time_point.split('-');
        return parseInt(year) * 372 + parseInt(month) * 31 + parseInt(day);
    }

    let n = 0;
    let bornAt = new Map();
    let bornBefore = new Map();
    let gen = new Map();
    let graph = new Map();
    let mupResult = -1;

    function NUMBER_PEOPLE() {
        console.log(n);
    }

    function NUMBER_PEOPLE_BORN_AT(args) {
        const atTime = timeConvert(args[0]);
        console.log(bornAt.get(atTime) || 0);
    }

    function MOST_ALIVE_ANCESTOR(args) {
        console.log(gen.get(args[0]));
    }

    function NUMBER_PEOPLE_BORN_BETWEEN(args) {
        const fromTime = timeConvert(args[0]);
        const toTime = timeConvert(args[1]);
        const fromIt = lastlowerBound(bornBefore, fromTime)
        const toIt = lastlowerBound(bornBefore, toTime)
        if (fromIt !== undefined && toIt !== undefined) {
            console.log((toIt?.value || 0) - (fromIt?.value || 0));
        } else {
            console.log(0);
        }
    }

    function lastlowerBound(map, key) {
        let result = null
        for (const k of Array.from(map.keys()).sort((a, b) => a-b)) {
            if (k > key) {
                return result;
            }
            result = {key: k, value: map.get(k)}
            if (k == key) return result
        }
        return result;
    }

    function welshPowell() {
        const people = {};
        const result = {};
        Array.from(graph.keys()).forEach((key) => {
            people[key] = 0;
        });
        let kolor = 1;
        let start = Object.keys(people)[0];
        let nextStart = start;

        let kolored = 0;
        let canKolor = true;
        let curr = new Set();
        while (kolored < n) {
            people[start] = kolor;
            kolored++;
            result[kolor] = (result[kolor] || 0) + 1;
            let sortedDegree = Object.keys(people).sort((a, b) => {
                if (graph.get(b).size < graph.get(a).size) {
                    return true;
                } else if (graph.get(b).size === graph.get(a).size) {
                    return b < a;
                }
                return false;
            })
            sortedDegree.forEach((key) => {
                canKolor = people[key] === 0;
                if (!canKolor) return;
                curr = graph.get(key);
                for (const neigh of curr) {
                    if (people[neigh] === kolor) {
                        if (nextStart === start) nextStart = key;
                        canKolor = false;
                        break;
                    }
                }
                if (!canKolor) return;
                people[key] = kolor;
                kolored++;
                result[kolor] = (result[kolor] || 0) + 1;
            });
            start = nextStart;
            kolor++;
        }
        let maximun = -1;
        Object.keys(result).forEach((key) => {
            const curr = result[key];
            if (maximun < curr) maximun = curr;
        });
        return maximun;
    }

    function MAX_UNRELATED_PEOPLE() {
        if (mupResult < 0) {
            mupResult = welshPowell();
        }
        console.log(mupResult);
    }

    function run(input) {
        const lines = input.split('\n');
        let line = lines.shift()
        while (line !== '*') {
            let [code, dob, father, mother, isAlive, region] = line.split(' ');
            n++;

            const birthTime = timeConvert(dob);
            bornAt.set(birthTime, (bornAt.get(birthTime) || 0) + 1);

            let maxGen = Math.max(gen.get(father), gen.get(mother))
            if (isNaN(maxGen)) maxGen = -1
            gen.set(code,  maxGen + 1);

            if (!graph.has(code)) graph.set(code, new Set());
            if (father !== "0000000") {
                graph.get(code).add(father);

                if (!graph.has(father)) graph.set(father, new Set());
                graph.get(father).add(code);
            }

            if (mother !== "0000000") {
                graph.get(code).add(mother);

                if (!graph.has(mother)) graph.set(mother, new Set());
                graph.get(mother).add(code);
            }
            line = lines.shift()
        }

        bornBefore.set(-1, 0);
        let sum = 0;
        for (const key of Array.from(bornAt.keys()).sort((a,b) => a - b)) {
            sum += bornAt.get(key);
            bornBefore.set(key, sum);
        }
    
        line = lines.shift()
        while (line != '***') {
            const [cmd, ...params] = line.split(' ');
            commandMap[cmd](params);
            line = lines.shift()
        }
    }

    const commandMap = {
        "NUMBER_PEOPLE": NUMBER_PEOPLE,
        "NUMBER_PEOPLE_BORN_AT": NUMBER_PEOPLE_BORN_AT,
        "MOST_ALIVE_ANCESTOR": MOST_ALIVE_ANCESTOR,
        "NUMBER_PEOPLE_BORN_BETWEEN": NUMBER_PEOPLE_BORN_BETWEEN,
        "MAX_UNRELATED_PEOPLE": MAX_UNRELATED_PEOPLE,
    };

    run(input);
}

// Example usage
const input = `0000001 1920-08-10 0000000 0000000 Y 00002
0000002 1920-11-03 0000000 0000000 Y 00003
0000003 1948-02-13 0000001 0000002 Y 00005
0000004 1946-01-16 0000001 0000002 Y 00005
0000005 1920-11-27 0000000 0000000 Y 00005
0000006 1920-02-29 0000000 0000000 Y 00004
0000007 1948-07-18 0000005 0000006 Y 00005
0000008 1948-07-18 0000005 0000006 Y 00002
0000009 1920-03-09 0000000 0000000 Y 00005
0000010 1920-10-16 0000000 0000000 Y 00005
*
NUMBER_PEOPLE
NUMBER_PEOPLE_BORN_AT 1919-12-10
NUMBER_PEOPLE_BORN_AT 1948-07-18
MAX_UNRELATED_PEOPLE
MOST_ALIVE_ANCESTOR 0000008
MOST_ALIVE_ANCESTOR 0000001
NUMBER_PEOPLE_BORN_BETWEEN 1900-12-19 1928-11-16
NUMBER_PEOPLE_BORN_BETWEEN 1944-08-13 1977-12-15
NUMBER_PEOPLE_BORN_BETWEEN 1987-01-24 1988-06-03
***
`;
citizen(input);
export default citizen