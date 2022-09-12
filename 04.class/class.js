process.stdin.resume();
process.stdin.setEncoding('utf8');
var input_string = '';
text = "";

process.stdin.on('data', function(chunk) {
    input_string += chunk;
});

valGlobal1 = ""
process.stdin.on('end', function() {
    const lines = input_string.split("\n");
    lines.forEach(i => console.log(i),);
    valGlobal1 = lines;
});

var fs = require("fs");

fs.writeFile('out.txt', text, (err, data) => {
    if(err) console.log(err);
    else console.log('保存しました');
  });