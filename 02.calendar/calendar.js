const minimist = require('minimist')
const { DateTime } = require('luxon')

const date = DateTime.local()

const argv = minimist(process.argv.slice(2), {
  string: ['output'],
  default: {
    m: date.month,
    y: date.year
  }
})

const inputDate = DateTime.fromObject({
  year: argv.y,
  month: argv.m
})

const lastDay = inputDate.daysInMonth
const firstWeekday = inputDate.weekday

console.log('    ', argv.m, '月', argv.y, '年')
console.log(' 日 月 火 水 木 金 土')

let tempWeekday = firstWeekday

if (tempWeekday === 7)[tempWeekday = 0]

while (tempWeekday > 0) {
  process.stdout.write(''.padStart(3, ' '))
  tempWeekday -= 1
}

let count = 1
count += firstWeekday

while (count <= lastDay + firstWeekday) {
  process.stdout.write(String(count - firstWeekday).padStart(3, ' '))
  if (count % 7 === 0) {
    console.log('\n')
  }
  count += 1
}

console.log('\n')
