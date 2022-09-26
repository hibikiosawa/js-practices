const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const inquirer = require('inquirer')

class MemoApp {
  input () {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    let inputString = ''

    process.stdin.on('data', function (chunk) {
      inputString += chunk
    })

    process.stdin.on('end', function () {
      const lines = inputString.split('\n')

      fs.writeFile(`${lines[0]}.txt`, inputString, (err) => {
        if (err) console.log(err)
        else console.log('保存しました')
      })
    })
  }

  readFiles (files) {
    const fileList = files.filter(function (file) {
      return fs.statSync(file).isFile() && file.endsWith('.txt')
    })
    return fileList
  }

  list () {
    fs.readdir('.', function (err, files) {
      if (err) throw err
      const fileList = memoApp.readFiles(files)
      fileList.forEach(function (index) {
        const text = fs.readFileSync(index, 'utf8')
        const lines = text.match(/^.*$/m)
        console.log(lines[0])
      })
    })
  }

  reference () {
    fs.readdir('.', function (err, files) {
      if (err) throw err
      const fileList = memoApp.readFiles(files)
      const fileText = []
      fileList.forEach(function (index) {
        const text = fs.readFileSync(index, 'utf8', function (err, result) {
          if (err) throw err
        })
        const textSplited = text.split(/\r\n|\n/)
        fileText.push(textSplited[0])
      })
      inquirer.prompt([
        {
          message: 'ファイル詳細',
          type: 'list',
          name: 'title',
          choices: fileText
        }
      ])
        .then(answer => {
          const text = fs.readFileSync(`${answer.title}.txt`, 'utf8')
          console.log(text)
        })
    })
  }

  delete () {
    fs.readdir('.', function (err,files) {
      if (err) throw err
      const fileList = memoApp.readFiles(files)
      const fileText = []
      fileList.forEach(function (index) {
        const text = fs.readFileSync(index, 'utf8')
        const textSplited = text.split(/\r\n|\n/)
        fileText.push(textSplited[0])
      })
      inquirer.prompt([
        {
          type: 'list',
          name: 'ファイル削除',
          choices: fileText
        }
      ])
        .then(answer => {
          fs.unlink(`${answer.title}.txt`, (err) => {
            if (err) throw err
            console.log('削除しました')
          })
        })
    })
  }
}

const memoApp = new MemoApp()

if (argv.l) {
  memoApp.list()
} else if (argv.r) {
  memoApp.reference()
} else if (argv.d) {
  memoApp.delete()
} else {
  memoApp.input()
}
