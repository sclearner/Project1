function isTimeValid(hour, minute, second) {
    return (0 <= hour && hour < 24) && (0 <= minute && minute < 60) &&  (0 <= second && second < 60)
}

function extractTime(input) {
    if (input.length != 8) return "INCORRECT"
    let [hour, minute, second] = input.split(':')
    if (input.match(/[-\.]/)) return "INCORRECT"
    if (hour.length != 2 || minute.length != 2 || second.length != 2) return "INCORRECT"
    let [h, m, s] = [parseInt(hour), parseInt(minute), parseInt(second)]
    return isTimeValid(h, m, s) ? `${h*3600 + m*60 + s}`: "INCORRECT"
}

console.log('==========================')
input = `10:37:01`

console.log(extractTime(input))

export default extractTime