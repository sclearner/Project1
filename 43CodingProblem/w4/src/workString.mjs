import ReadLine from "../../general/readline.mjs";

const safe = new Set();

function workString(input) {
    let inp = new ReadLine(input)
    let s = '';
    while (true) {
        s = inp.readLine()
        if (s === '*') break;
        safe.add(s);
    }

    while (true) {
        s = inp.readLine()
        if (s === '***') break;
        const ss = s.split(' ');
        const cmd = ss[0];
        const word = ss[1];

        if (cmd === 'find') {
            console.log(safe.has(word) ? 1 : 0);
        } else {
            console.log(safe.has(word) ? 0 : 1);
            safe.add(word);
        }
    }
}

console.log('==========================')
input =  `computer
university
school
technology
phone
*
find school
find book
insert book
find algorithm
find book
insert book
***`

workString(input)

export default workString
