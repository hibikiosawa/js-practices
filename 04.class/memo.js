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

    process.stdin.on('data', (chunk) => {
      inputString += chunk
    })

    process.stdin.on('end', () => {
      const today = new Date

      fs.writeFile(`${today}.txt`, inputString, (err) => {
        if (err) console.log(err)
        else console.log('保存しました')
      })
    })
  }

  list () {
    fs.readdir('.', (err, allFiles) => {
      const text = this.#filterFirstLine(allFiles)
      text.forEach((element) => {
        console.log(element)
      })
    })
  }

  refer () {
    fs.readdir('.', (err,allFiles) => {
      if (err) throw err
      const text = this.#filterFirstLine(allFiles)
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
    fs.readdir('.', (err,allFiles) => {
      if (err) throw err
      const text = this.#filterFirstLine(allFiles)
      inquirer.prompt([
        {
          message: 'ファイル削除',
          type: 'list',
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
    return allfiles.filter((file) => {
      return fs.statSync(file).isFile() && file.endsWith('.txt')
    })
  }

  #filterFirstLine (allFiles) {
    const files = this.#filterFile(allFiles)
    const texts = []
    files.forEach((file) => {
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
