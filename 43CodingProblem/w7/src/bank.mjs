class Timed {
    constructor(hour = 0, minute = 0, second = 0) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
}

class Info {
    constructor(toAccount, money, timePoint, atm) {
        this.toAccount = toAccount;
        this.money = money;
        const [hour, minute, second] = timePoint.split(':').map(Number);
        this.timePoint = new Timed(hour, minute, second);
        this.atm = atm;
    }
}

const graph = new Map();
let n = 0;
let totalMoney = 0;

const numberTransactions = () => {
    console.log(n);
}

const totalMoneyTransaction = () => {
    console.log(totalMoney);
}

const listSortedAccounts = () => {
    let result = []
    for (const account of graph.keys()) {
        result.push(account)
    }
    console.log(result.join(' '))
}

const totalMoneyTransactionFrom = (params) => {
    const account = params[0];
    let result = 0;
    if (graph.has(account)) {
        for (const transaction of graph.get(account)) {
            result += transaction.money;
        }
    }
    console.log(result);
}

let visited = new Set();

function backtrack(from, start, lo, k) {
    if (lo > k) {
        return false;
    }
    if (lo === k) {
        return from === start;
    }
    if (from === start && lo !== 0) {
        return false;
    }
    visited.add(from);
    for (const transaction of (graph.get(from) || [])) {
        const next = transaction.toAccount;
        if (visited.has(next) && next !== start) {
            continue;
        }
        if (backtrack(next, start, lo + 1, k)) {
            return true;
        }
    }
    visited.delete(from);
    return false;
}

const inspectCycle = (params) => {
    const account = params[0];
    const k = parseInt(params[1]);
    visited.clear();
    const result = backtrack(account, account, 0, k);
    console.log(result ? '1' : '0');
}

function bankTransaction(inputString) {
    let input = inputString.trim().split('\n')
    let i = 0
    for (;i < input.length; i++) {
        let line = input[i]
        if (line === "#") {
            break;
        }
        const [fromAccount, toAccount, money, timePoint, atm] = line.trim().split(' ');
        const transaction = new Info(toAccount, parseInt(money), timePoint, atm);
        if (!graph.has(fromAccount)) graph.set(fromAccount, [])
        graph.get(fromAccount).push(transaction)
        if (!graph.has(toAccount)) {
            graph.set(toAccount, []);
        }
        n++;
        totalMoney += parseInt(money);
    }
    i++;
    for (;i<input.length;i++) {
        let command = input[i]
        if (command === "#") {
            break
        }
        let [cmd, ...params] = command.trim().split(' ')
        switch (cmd) {
            case "?number_transactions": 
                numberTransactions()
                break
            case "?total_money_transaction": 
                totalMoneyTransaction()
                break
            case "?list_sorted_accounts": 
                listSortedAccounts()
                break
            case "?total_money_transaction_from": 
                totalMoneyTransactionFrom(params)
                break
            case "?inspect_cycle": 
                inspectCycle(params)
                break
        }
    }
}

// Example usage
const input = `T000010010 T000010020 1000 10:20:30 ATM1
T000010010 T000010030 2000 10:02:30 ATM2
T000010010 T000010040 1500 09:23:30 ATM1
T000010020 T000010030 3000 08:20:31 ATM1
T000010030 T000010010 4000 12:40:00 ATM2
T000010040 T000010010 2000 10:30:00 ATM1
T000010020 T000010040 3000 08:20:31 ATM1
T000010040 T000010030 2000 11:30:00 ATM1
T000010040 T000010030 1000 18:30:00 ATM1
#
?number_transactions
?total_money_transaction
?list_sorted_accounts
?total_money_transaction_from T000010010
?inspect_cycle T000010010 3
#
`;

bankTransaction(input);

export default bankTransaction