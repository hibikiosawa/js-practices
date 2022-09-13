const argv = require('minimist')(process.argv.slice(2))
const fs = require("fs");


class Memo {
  inputMemo () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var input_string = '';

    process.stdin.on('data', function(chunk) {
      input_string += chunk;
    });

    process.stdin.on('end', function() {
      const lines = input_string.split("\n");
       lines.forEach(i => console.log(i));

       fs.writeFile(`${lines[0]}.txt`, lines[0], (err, data) => {
        if(err) console.log(err);
        else console.log('保存しました');
      });
    });
  }

  listMemo() {
    
  }

  referenceMemo() {


  }

  deleteMemo(){

  }


}

const memo = new Memo

if (argv.l) {
  memo.outputMemo()
} else if (argv.r) {
  memo.referenceMemo()
} else if (argv.d) {
  memo.deleteMemo()
} else {
  memo.inputMemo()
}