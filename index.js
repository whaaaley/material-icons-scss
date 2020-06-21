
const fs = require('fs')

// Read the root directory

const rootPath = './material-design-icons/'
const rootDir = fs.readdirSync(rootPath, { withFileTypes: true })

// Filter out non-directories
// Not needed but it reduces the amount of errors we catch and log below

const rootDirs = []

for (let i = 0; i < rootDir.length; i++) {
  const dirent = rootDir[i]

  if (dirent.isDirectory() && dirent.name.startsWith('.') === false) {
    rootDirs.push(dirent.name)
  }
}

// Create SCSS functions for SVG icons

const icon = (name, svg) => {
  svg = svg.replace(/circle/g, 'circle fill="#{hex($color)}"')
  svg = svg.replace(/path/g, 'path fill="#{hex($color)}"')

  return `@function ${name}($color) {\n  @return 'data:image/svg+xml;utf8,${svg}';\n}`
}

// Reading files and directories kind of sucks

const readDirSyncSafe = data => {
  let result

  try {
    result = fs.readdirSync(data)
  } catch (err) {
    console.log(err.message)
  }

  return result
}

const readFileSyncSafe = data => {
  let result

  try {
    result = fs.readFileSync(data, 'utf8')
  } catch (err) {
    console.log(err.message)
  }

  return result
}

// The rest...

const result = [`@function hex($hex) {\n  @return '%23' + str-slice($hex + '', 2);\n}`]

for (let i = 0; i < rootDirs.length; i++) {
  const prodDir = rootPath + rootDirs[i] + '/svg/production/'
  const prodDirs = readDirSyncSafe(prodDir) || []

  for (let i = 0; i < prodDirs.length; i++) {
    const svgName = prodDirs[i]
    const iconName = svgName.replace('.svg', '').replace(/_/g, '-')

    result.push(icon(iconName, readFileSyncSafe(prodDir + svgName, 'utf8')))
  }
}

// Write output to a file

const output = '\n' + result.join('\n\n')

fs.writeFile('main.scss', output, err => {
  if (err) throw err

  console.log('Done!')
})
