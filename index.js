
const fs = require('fs')

const walk = (path, callback) => {
  const entry = fs.readdirSync(path)

  for (let i = 0; i < entry.length; i++) {
    const item = path + '/' + entry[i]
    fs.statSync(item).isFile() ? callback(item) : walk(item, callback)
  }
}

// ./tmp/category/**/*.svg
// 0123456       ^^   1234

const delimiters = /_|\//g

const naming = path => {
  path = path.slice(path.indexOf('/', 6) + 1, path.length - 4)
  path = path.replace(delimiters, '-')

  return 'ic-' + path
}

const fillNone = /<path fill="none" d="(\w|\d|\s|\.)+"\/>/g
const circle = /circle/g
const path = /path/g

const icon = (name, svg) => {
  svg = svg.replace(fillNone, '')
  svg = svg.replace(circle, 'circle fill="#{hex($color)}"')
  svg = svg.replace(path, 'path fill="#{hex($color)}"')

  return `\n@function ${name}($color) {\n  @return 'data:image/svg+xml;utf8,${svg}';\n}\n`
}

const dist = {
  'materialicons/': { name: 'filled', data: '' },
  'materialiconsoutlined/': { name: 'outlined', data: '' },
  'materialiconsround/': { name: 'round', data: '' },
  'materialiconssharp/': { name: 'sharp', data: '' },
  'materialiconstwotone/': { name: 'twotone', data: '' }
}

walk('./tmp', path => {
  const svg = fs.readFileSync(path, 'utf8')

  for (const key in dist) {
    const name = naming(path.replace(key, ''))

    if (path.includes(key) === true) {
      dist[key].data += icon(name, svg)
    }
  }
})

const hexFn = `\n@function hex($hex) {\n  @return '%23' + str-slice($hex + '', 2);\n}\n`

for (const key in dist) {
  const file = dist[key]
  fs.writeFileSync('style/' + file.name + '.scss', hexFn + file.data)
}
