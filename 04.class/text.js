process.stdin.resume();
process.stdin.setEncoding('utf8');
var input_string = '';

process.stdin.on('data', function(chunk) {
    input_string += chunk;
});

process.stdin.on('end', function() {
    const lines = input_string.split("\n");
    lines.forEach(i => console.log(i),);
});


var fs = require("fs");
var text = "テスト出力";


fs.writeFile('out.txt', text, (err, data) => {
    if(err) console.log(err);
    else console.log('write end');
  });

 