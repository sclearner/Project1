function eCommerce(input) {
    const lines = input.trim().split('\n');

    let n = 0;
    let totalMoney = 0;
    const sr = {};
    const scr = {};
    const tp = new Map();
    const prefixTp = new Map();

    function timeConvert(timePoint) {
        const [hour, minute, second] = timePoint.split(':').map(Number);
        return hour * 3600 + minute * 60 + second;
    }

    function totalNumberOrders(args) {
        console.log(n);
    }

    function totalRevenue(args) {
        console.log(totalMoney);
    }

    function revenueOfShop(args) {
        console.log(sr[args[0]] || 0);
    }

    function totalConsumeOfCustomerShop(args) {
        console.log(scr[args[1] + args[0]] || 0);
    }

    function totalRevenueInPeriod(args) {
        const fromTime = timeConvert(args[0]);
        const toTime = timeConvert(args[1]);
        let fromIt = lastlowerBound(prefixTp, fromTime);
        let toIt = lastlowerBound(prefixTp, toTime);
        console.log((toIt?.value || 0) - (fromIt?.value || 0));
    }

    function lowerBound(map, key) {
        for (const k of Array.from(map.keys()).sort((a, b) => a-b)) {
            if (k >= key) {
                return { key: k, value: map.get(k) };
            }
        }
        return null;
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

    function calculatePrefixTp() {
        prefixTp.set(-1, 0);
        let sum = 0;
        for (const key of Array.from(tp.keys()).sort((a, b) => a-b)) {
            sum += tp.get(key);
            prefixTp.set(key, sum);
        }
    }

    for (const command of lines) {
        if (command === '#') {
            break;
        }
        const [customerID, productID, price, shopID, timePoint] = command.split(' ');
        n++;
        totalMoney += Number(price);
        const timep = timeConvert(timePoint);
        sr[shopID] = (sr[shopID] || 0) + Number(price);
        scr[shopID + customerID] = (scr[shopID + customerID] || 0) + Number(price);
        tp.set(timep, (tp.get(timep) || 0) + Number(price));
    }

    calculatePrefixTp();

    const cmds = {
        '?total_number_orders': totalNumberOrders,
        '?total_revenue': totalRevenue,
        '?revenue_of_shop': revenueOfShop,
        '?total_consume_of_customer_shop': totalConsumeOfCustomerShop,
        '?total_revenue_in_period': totalRevenueInPeriod
    };

    for (const command of lines.slice(n+1)) {
        if (command === '#') {
            return
        }
        const [cmd, ...params] = command.split(' ');
        cmds[cmd](params);
    }
}

const input = `C001 P001 10 SHOP001 10:30:10
C001 P002 30 SHOP001 12:30:10
C003 P001 40 SHOP002 10:15:20
C001 P001 80 SHOP002 08:40:10
C002 P001 130 SHOP001 10:30:10
C002 P001 160 SHOP003 11:30:20
#
?total_number_orders
?total_revenue
?revenue_of_shop SHOP001
?total_consume_of_customer_shop C001 SHOP001 
?total_revenue_in_period 10:00:00 18:40:45
#`;

eCommerce(input);

export default eCommerce
