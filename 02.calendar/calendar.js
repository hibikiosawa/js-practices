var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
	string: ['output'],
	boolean: [
		'month',
		'year',
	],
	alias: {
		m: 'month',
		y: 'year',
	},
	default: {
		month: 4,
		year: 2000,
	}
});

let date_of_day = new Date(argv.year,argv.month,0) 

let last_day = date_of_day.getDate();
let first_day_of_week = date_of_day.getDay();

console.log (argv.month,'月',argv.year,'年')
console.log ( ' 日 月 火 水 木 金 土')

const beginning_of_month = first_day_of_week;

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
  