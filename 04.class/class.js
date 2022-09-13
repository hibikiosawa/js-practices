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
    var fs = require('fs');
    fs.readdir('.', function(err, files){
      if (err) throw err;
      var fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
      })
      fileList.forEach(function(index){
        const text = fs.readFileSync(index,'utf8')
        console.log(text)
      });
    });
  }

  referenceMemo() {


  }

  deleteMemo(){

  }


}

const memo = new Memo

if (argv.l) {
  memo.listMemo()
} else if (argv.r) {
  memo.referenceMemo()
} else if (argv.d) {
  memo.deleteMemo()
} else {
  memo.inputMemo()
}