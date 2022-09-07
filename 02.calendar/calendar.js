var minimist = require('minimist');
var { DateTime } = require('luxon');

var date = DateTime.local();

var argv = minimist(process.argv.slice(2), {
  string: ['output'],
  default: {
    m: date.month,
    y: date.year
  }
});

let inputDate = DateTime.fromObject({
    year: argv.y,
    month: argv.m
});

let lastDay = inputDate.daysInMonth;
let firstWeekday = inputDate.weekday;

console.log ('    ',argv.m,'月',argv.y,'年')
console.log ( ' 日 月 火 水 木 金 土')

var tempWeekday = firstWeekday;

while (tempWeekday > 0){
  process.stdout.write(''.padStart(3," "))
  tempWeekday -= 1
}

var count = 1;
count += firstWeekday;

while (count <= lastDay + firstWeekday){
  process.stdout.write(String(count - firstWeekday).padStart(3," "))
  if (count % 7 == 0){
    console.log('\n')
  }
  count += 1
}

console.log("\n")
  