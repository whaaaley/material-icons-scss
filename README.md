
# material-icons-scss

> Material design icon functions for SCSS

This project contains and generates SCSS functions that output SVG data URIs using SVGs from the official [google/material-design-icons](https://github.com/google/material-design-icons) repository, optimized using [SVGO](https://github.com/svg/svgo) and this project.

## Install

```
$ npm i @whaaaley/material-icons-scss
```

## Usage

When using `node-sass` I recommend using the `--include-path` flag to keep imports from `node_modules` pretty.

```
$ node-sass src/app.scss -o public --include-path node_modules
```

Import one of the icon styles and place an icon by passing a color to an icon function inside of a background property as if it were an image.

### Input:

```scss
@import 'material-icons-scss/style/filled';
// @import 'material-icons-scss/style/outlined';
// @import 'material-icons-scss/style/round';
// @import 'material-icons-scss/style/sharp';
// @import 'material-icons-scss/style/twotone';

$red: #FF0000;
$icon-menu: ic-menu-24px($red);

.foobar {
  width: 24px;
  height: 24px;
  background: url($icon-menu) center no-repeat;
}
```

### Output:

```css
.foobar {
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#F00" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>') center no-repeat;
}
```

## How to build

Beware, cloning `google/material-design-icons` repo takes a while.

```
$ git clone https://github.com/whaaaley/material-icons-scss.git
$ cd material-icons-scss
$ git clone https://github.com/google/material-design-icons.git
$ make
```
