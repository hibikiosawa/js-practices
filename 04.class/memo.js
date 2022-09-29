const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const inquirer = require('inquirer')

class MemoApp {
  contructor () {
    this.content = content
  }

  input () {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    let inputString = ''

    process.stdin.on('data', function (chunk) {
      inputString += chunk
    })

    process.stdin.on('end', function () {
      const today = new Date

      fs.writeFile(`${today}.txt`, inputString, (err) => {
        if (err) console.log(err)
        else console.log('保存しました')
      })
    })
  }

  list () {
    fs.readdir('.', function (err, allFiles) {
      if (err) throw err
      const files = memoApp.#filterFile(allFiles)
      files.forEach(function (file) {
        const text = fs.readFileSync(file, 'utf8')
        const lines = text.split(/\r\n|\n/)
        console.log(lines[0])
      })
    })
  }

  refer () {
    fs.readdir('.', function (err,allFiles) {
      if (err) throw err
      const text = memoApp.#linesConvert(allFiles)
      inquirer.prompt([
        {
          message: 'ファイル詳細',
          type: 'list',
          name: 'title',
          choices: text
        }
      ])
        .then(answer => {
          const text = fs.readFileSync(`${answer.title}.txt`, 'utf8')
          console.log(text)
        })
      })
    }

  delete () {
    fs.readdir('.', function (err,allFiles) {
      if (err) throw err
      const text = memoApp.#linesConvert(allFiles)
      inquirer.prompt([
        {
          type: 'list',
          name: 'ファイル削除',
          choices: text
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

  #filterFile (allfiles) {
    return allfiles.filter(function (file) {
      return fs.statSync(file).isFile() && file.endsWith('.txt')
    })
  }

  #linesConvert (allFiles) {
    const files = this.#filterFile(allFiles)
    const texts = []
    files.forEach(function (file) {
      const text = fs.readFileSync(file, 'utf8')
      const lines = text.split(/\r\n|\n/)
      texts.push(lines[0])
    })
    return texts
  }
}

const memoApp = new MemoApp()

if (argv.l) {
  memoApp.list()
} else if (argv.r) {
  memoApp.refer()
} else if (argv.d) {
  memoApp.delete()
} else {
  memoApp.input()
}
