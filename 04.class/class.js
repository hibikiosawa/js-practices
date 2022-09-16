const argv = require('minimist')(process.argv.slice(2))
const fs = require("fs");
const inquirer = require('inquirer');
const { TextDecoder } = require('util');


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

  readFiles(files){
        const fileList = files.filter(function(file){
          return fs.statSync(file).isFile() && /.*\.txt$/.test(file); //絞り込み
        })
      return fileList
  }

  listMemo() {
    fs.readdir('.', function(err, files){
      if (err) throw err;
      let fileList = memo.readFiles(files);
      fileList.forEach(function(index){
        const text = fs.readFileSync(index, 'utf8');
        const lines = text.match(/^.*$/m);
        console.log(lines[0]);
      });
  })
}

  referenceMemo() {
    fs.readdir('.', function(err, files){
      if (err) throw err;
      let fileList = memo.readFiles(files);
      let files_sliced = []
      files_sliced = fileList.forEach(function(index){
        files_sliced.push(index.slice(0,-4));
        const answer = inquirer.prompt([
            {
              message: 'ファイル詳細',
              type: 'list',
              name: 'title',
              choices: files_sliced
            }
          ])
          .then(answer => {
            const text = fs.readFileSync(`${answer.title}.txt`, 'utf8');
            console.log(text)
          })
      })
    });
  }

  deleteMemo(){
    fs.readdir('.', function(err, files){
      if (err) throw err;
      let fileList = memo.readFiles(files);
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