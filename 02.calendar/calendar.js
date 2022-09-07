var minimist = require('minimist');
var { DateTime } = require('luxon');

var today_date = DateTime.local();

var argv = minimist(process.argv.slice(2), {
  string: ['output'],
  default: {
    m: today_date.month,
    y: today_date.year
  }
});

let date_of_day = DateTime.fromObject({
    year: argv.y,
    month: argv.m
});

let last_day = date_of_day.daysInMonth;

let first_day_of_week = date_of_day.day;

console.log(first_day_of_week)

console.log ('    ',argv.m,'月',argv.y,'年')
console.log ( ' 日 月 火 水 木 金 土')

var beginning_of_month = first_day_of_week;

while (beginning_of_month > 0){
  process.stdout.write(''.padStart(3," "))
  beginning_of_month -= 1
}

var count = 1;
count += first_day_of_week;

while (count <= last_day + first_day_of_week){
  process.stdout.write(String(count - first_day_of_week).padStart(3," "))
  if (count % 7 == 0){
    console.log('\n')
  }
  count += 1
}

console.log("\n")
  