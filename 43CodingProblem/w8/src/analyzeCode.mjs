function analyzeCode(input) {
    function timeConvert(time_point) {
        const [hour, minute, second] = time_point.split(':');
        return parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
    }

    let n = 0;
    let err = 0;
    let periodTime = new Map();
    let errUser = {};
    let totalPoint = {};
    let maxPoint = {};

    function totalNumberSubmissions() {
        console.log(n);
    }

    function numberErrorSubmission() {
        console.log(err);
    }

    function numberErrorSubmissionOfUser(args) {
        console.log(errUser[args[0]] || 0);
    }

    function totalPointOfUser(args) {
        console.log(totalPoint[args[0]] || 0);
    }

    function numberSubmissionPeriod(args) {
        const fromTime = timeConvert(args[0]);
        const toTime = timeConvert(args[1]);

        let fromIt = Array.from(periodTime.entries()).find(([time]) => time >= fromTime);
        if (fromIt) {
            fromIt = fromIt[1];
        } else {
            fromIt = 0;
        }

        let toIt = Array.from(periodTime.entries()).reverse().find(([time]) => time <= toTime);
        if (toIt) {
            toIt = toIt[1];
        } else {
            toIt = 0;
        }

        console.log(toIt - fromIt);
    }

    function run(input) {
        const lines = input.split('\n');
        let line = lines.shift()
        while (line !== '#') {
            let [userID, problemID, timePoint, status, point] = line.split(' ');
            point = parseInt(point)
            n++;

            if (status === "ERR") {
                err++;
                errUser[userID] = (errUser[userID] || 0) + 1;
            }

            const time = timeConvert(timePoint);
            periodTime.set(time, (periodTime.get(time) || 0) + 1);

            const last = maxPoint[userID]?.[problemID] || 0;
            if (point > last) {
                maxPoint[userID] = maxPoint[userID] || {};
                maxPoint[userID][problemID] = point;
                totalPoint[userID] = (totalPoint[userID] || 0) + (point - last);
            }
            line = lines.shift()
        }

        periodTime.set(-1, 0);
        let sum = 0;
        for (const [time, count] of periodTime.entries()) {
            sum += count;
            periodTime.set(time, sum);
        }

        line = lines.shift()
        while (line != '#') {
            const [cmd, ...params] = line.split(' ');
            commandMap[cmd](params);
            line = lines.shift()
        }
    }

    const commandMap = {
        "?total_number_submissions": totalNumberSubmissions,
        "?number_error_submision": numberErrorSubmission,
        "?number_error_submision_of_user": numberErrorSubmissionOfUser,
        "?total_point_of_user": totalPointOfUser,
        "?number_submission_period": numberSubmissionPeriod,
    }

    run(input);
}

// Example usage
const input = `U001 P01 10:30:20 ERR 0
U001 P01 10:35:20 OK 10
U001 P02 10:40:20 ERR 0
U001 P02 10:55:20 OK 7
U002 P01 10:40:20 ERR 0
U001 P01 11:35:20 OK 8
U002 P02 10:40:20 OK 10
#
?total_number_submissions
?number_error_submision
?number_error_submision_of_user U002 
?total_point_of_user U001 
?number_submission_period 10:00:00 11:30:45
#
`;
analyzeCode(input);
export default analyzeCode