let clamp = function (a, min, max) {
    if (min == undefined) min = Number.NEGATIVE_INFINITY
    if (max == undefined) max = Number.POSITIVE_INFINITY
    return Math.max(min, Math.min(max, a))
}

function calculateCostNoVAT(input, cost) {
    // Lower bound
    return Object.keys(cost).reduce((sum, key, index, a) => {
        let differ = clamp(input, key, a[index + 1]) - key
        if (differ <= 0 || differ == NaN) return sum
        else return sum + differ * cost[key]
    }, 0)
}

function electricCost(input) {
    let kWh = parseInt(input)
    let oldCost = {0: 1728, 50: 1786, 100: 2074, 200: 2612, 300: 2919, 400: 3015}
    let newCost = {0: 1728, 100: 2074, 200: 2612, 400: 3111, 700: 3457}

    return (11 * (calculateCostNoVAT(input, newCost) - calculateCostNoVAT(input, oldCost)) / 10).toFixed(2)
}

console.log('==========================')
input = `540`
console.log(electricCost(input))

export default electricCost