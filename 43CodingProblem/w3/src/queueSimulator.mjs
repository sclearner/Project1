import ReadLine from "../../general/readline.mjs";

function queueSimulator(input) {
    let inp = new ReadLine(input)
    let a = [];
    let s;
    while (s !== "#") {
        s = inp.readLine();
        let ss = s.split(" ");
        let func = ss[0];
        if (func === "PUSH") a.push(parseInt(ss[1]));
        else if (func === "POP") {
            console.log(a.shift())
        }
    }
}

console.log('==========================')
input = `PUSH 1
PUSH 2
PUSH 3
POP
POP
PUSH 4
PUSH 5
POP
#`

queueSimulator(input)

export default queueSimulator