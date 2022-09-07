var minimist = require('minimist');

var today_date = new Date()

console.log(today_date)

var argv = minimist(process.argv.slice(2), {
  string: ['output'],
  default: {
    m: today_date.getMonth() + 1,
    y: today_date.getFullYear(),
  }
});

let date_of_day = new Date(argv.y,argv.m,0) 
let last_day = date_of_day.getDate();
let first_day_of_week = date_of_day.getDay();

console.log ('    ',argv.m,'月',argv.y,'年')
console.log ( ' 日 月 火 水 木 金 土')

var count = 1;
count += first_day_of_week;


var beginning_of_month = first_day_of_week;

while (beginning_of_month > 0){
  process.stdout.write(''.padStart(3," "))
  beginning_of_month -= 1
}

while (count <= last_day + first_day_of_week){
  process.stdout.write(String(count - first_day_of_week).padStart(3," "))
  if (count % 7 == 0){
    console.log('\n')
  }
  count += 1
}

console.log("\n")
  