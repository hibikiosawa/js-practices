const argv = require('minimist')(process.argv.slice(2))
const fs = require("fs");
const inquirer = require('inquirer');


class Memo {
  inputMemo () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    let input_string = '';

    process.stdin.on('data', function(chunk) {
      input_string += chunk;
    });

    process.stdin.on('end', function() {
      const lines = input_string.split("\n");

       fs.writeFile(`${lines[0]}.txt`, input_string, (err, data) => {
        if(err) console.log(err);
        else console.log('保存しました');
      });
    });
  }



  listMemo() {
    const fs = require('fs');
    fs.readdir('.', function(err, files){
      if (err) throw err;
      const fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
      })
      fileList.forEach(function(index){
        const text = fs.readFileSync(index, 'utf8');
        const lines = text.toString().split('\r\n');
        console.log(lines[0]);
      });
    });
  }

  referenceMemo() {
    const fs = require('fs');
    fs.readdir('.', function(err, files){
      if (err) throw err;
      const fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
      })

      const answer = inquirer.prompt([
        {
          type: 'list',
          name: 'title',
          choices: fileList
        }
      ])
      .then(answer => {
        const text = fs.readFileSync(answer.title, 'utf8');
        console.log(text)
      })
    });
  }

  deleteMemo(){
    const fs = require('fs');
    fs.readdir('.', function(err, files){
      if (err) throw err;
      const fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
      })

      const answer = inquirer.prompt([
        {
          type: 'list',
          name: 'title',
          choices: fileList
        }
      ])
      .then(answer => {
        fs.unlink(answer.title,(err) => {
            if (err) throw err;
            console.log('削除しました')
        })
    })
    });
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