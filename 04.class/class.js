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
        var text = fs.readFileSync(index, 'utf8');
        var lines = text.toString().split('\r\n');
        console.log(lines[0]);
      });
    });
  }

  referenceMemo() {
    var fs = require('fs');
    fs.readdir('.', function(err, files){
      if (err) throw err;
      var fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
      })
      fileList.forEach(function(index){
        var text = fs.readFileSync(index, 'utf8');
        var lines = text.toString().split('\r\n');
        
        for (var idx = 0; idx < lines.length; idx++) {
            console.log(lines[idx]);
        }
      });
    });
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