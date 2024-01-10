function isDateValid(year, month, day) {
    const maxDayInYear = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month > 12 || month < 1) return false
    if (month == 2) {
        if (day == 29) {
            return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 100 == 0)
        }
        else return 0 < day && day < 29;
    }
    else return 0 < day && day < maxDayInYear[month]
}

function extractDate(input) {
    if (input.length != 10) return "INCORRECT"
    let [year, month, day] = input.split('-')
    if (input.match(/[\.]/)) return "INCORRECT"
    if (year.length != 4 || month.length != 2 || day.length != 2) return "INCORRECT"
    let [y, m, d] = [parseInt(year), parseInt(month), parseInt(day)]
    return isDateValid(y, m, d) ? `${y} ${m} ${d}`: "INCORRECT"
}

console.log('==========================')
input = `2023-12-28`

console.log(extractDate(input))

export default extractDate