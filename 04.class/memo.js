const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const inquirer = require('inquirer')

class MemoApp {
  input () {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    let inputString = ''

    process.stdin.on('data', (chunk) => {
      inputString += chunk
    })

    process.stdin.on('end', () => {
      const date = new Date()
      const unixTime = date.getTime()

      fs.writeFile(`${unixTime}.txt`, inputString, (err) => {
        if (err) console.log(err)
        else console.log('保存しました')
      })
    })
  }

  list () {
    fs.readdir('.', (err, allFiles) => {
      const files = this.#selectTextFiles(allFiles)
      const texts = this.#collectFirstLines(files)
      texts.forEach((element) => {
        console.log(element)
      })
    })
  }

  refer () {
    fs.readdir('.', (err, allFiles) => {
      if (err) throw err
      const files = this.#selectTextFiles(allFiles)
      const choices = this.#collectFirstLines(files)
      inquirer.prompt([
        {
          message: 'ファイル詳細',
          type: 'list',
          name: 'title',
          choices
        }
      ])
        .then(answer => {
          const num = choices.indexOf(answer.title)
          const content = fs.readFileSync(files[num], 'utf8')
          console.log(content)
        })
    })
  }

  delete () {
    fs.readdir('.', (err, allFiles) => {
      if (err) throw err
      const files = this.#selectTextFiles(allFiles)
      const choices = this.#collectFirstLines(files)
      inquirer.prompt([
        {
          message: 'ファイル削除',
          type: 'list',
          name: 'title',
          choices
        }
      ])
        .then(answer => {
          const num = choices.indexOf(answer.title)
          fs.unlink(files[num], (err) => {
            if (err) throw err
          })
        })
    })
  }

  #selectTextFiles (files) {
    return files.filter((file) => {
      return fs.statSync(file).isFile() && file.endsWith('.txt')
    })
  }

  #collectFirstLines (files) {
    return files.map((file) => {
      const text = fs.readFileSync(file, 'utf8')
      const lines = text.split(/\r\n|\n/)
      return lines[0]
    })
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
