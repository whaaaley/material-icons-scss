
const fs = require('fs')

// Example path:
// ./tmp/extended/toggle/toggle_off/24px.svg
//  1   2        3      4      -   5    1234

const underscore = /_/g

const naming = path => {
  const name = path
    .split('/').slice(4)
    .join('-').slice(0, -4)
    .replace(underscore, '-')

  return 'ic-' + name
}

const baseProfile = / baseProfile=".*?"/g
const display = / display=".*?"/g
const fillRule = / fill-rule=".*?"/g
const style = / style=".*?"/g

const groupFillNone = /<g fill="none">.*<\/g>/g
const fillNone = /<(circle|path|polygon|rect)(?:(?!\/>).)*fill="none".*?\/>/g

const groupCloseBugged = /<g\/>/g
const randomRect = /<rect width="24" height="24"\/>/g

const start = /></
const end = /<\/svg>/

const icon = (name, svg) => {
  svg = svg.replace('xmlns="http://www.w3.org/2000/svg"', '#{$xmlns}')

  svg = svg.replace(baseProfile, '')
  svg = svg.replace(display, '')
  svg = svg.replace(fillRule, '')
  svg = svg.replace(style, '')

  svg = svg.replace(groupFillNone, '')
  svg = svg.replace(fillNone, '')

  svg = svg.replace(groupCloseBugged, '')
  svg = svg.replace(randomRect, '')

  svg = svg.replace(start, '><g fill="#{escape-hex($color)}"><')
  svg = svg.replace(end, '</g></svg>')

  return `\n@function ${name}($color) {\n  @return '#{$scheme}${svg}';\n}\n`
}

//
//
//

const walk = (path, callback) => {
  const entry = fs.readdirSync(path)

  for (let i = 0; i < entry.length; i++) {
    const item = path + '/' + entry[i]
    fs.statSync(item).isFile() ? callback(item) : walk(item, callback)
  }
}

const newDist = name => ({ name, data: '', css: '', html: '' })
const cssClass = name => `\n.${name} {\n  background: url(${name}(#000)) center no-repeat;\n}\n`
const htmlTag = name => `    <div class="icon ${name}"></div>\n`

const walkProject = projectPath => {
  const dist = {
    'materialicons/': newDist('filled'),
    'materialiconsoutlined/': newDist('outlined'),
    'materialiconsround/': newDist('round'),
    'materialiconssharp/': newDist('sharp'),
    'materialiconstwotone/': newDist('twotone')
  }

  walk(projectPath, path => {
    const svg = fs.readFileSync(path, 'utf8')

    for (const key in dist) {
      const name = naming(path.replace(key, ''))

      if (path.includes(key) === true) {
        dist[key].data += icon(name, svg)

        // for demo
        dist[key].css += cssClass(name)
        dist[key].html += htmlTag(name)
      }
    }
  })

  return dist
}

const vars = `\n$scheme: 'data:image/svg+xml;utf8,';\n$xmlns: 'xmlns="http://www.w3.org/2000/svg"';\n`
const hexFn = `\n@function escape-hex($hex) {\n  @return '%23' + str-slice($hex + '', 2);\n}\n`
const banner = vars + hexFn

const writeProject = (dist, path) => {
  // console.log(path)

  for (const key in dist) {
    const file = dist[key]

    fs.writeFileSync(`${path}/${file.name}.scss`, banner + file.data)

    // for demo
    const cssBanner = `\n@import '../../${path}/${file.name}.scss';\n\n.icon {\n  width: 24px;\n  height: 24px;\n}\n`

    fs.writeFileSync(`demo-dist/${path}/${file.name}.html`, `\n\n<html>\n  <link rel="stylesheet" href="/${path}/${file.name}.css"/>\n  <div style="display: flex; flex-flow: wrap;">\n${file.html}  </div>\n</html>\n`)
    fs.writeFileSync(`demo-src/${path}/${file.name}.scss`, cssBanner + file.css)
  }
}

const stableDist = walkProject('./tmp/stable')
const extendedDist = walkProject('./tmp/extended')

writeProject(extendedDist, 'extended')
writeProject(stableDist, 'stable')
