
# material-icons-scss

> Material design icon functions for SCSS

This project is generated from the official [google/material-design-icons](https://github.com/google/material-design-icons) repository.

## Install

```
$ npm i @whaaaley/material-icons-scss
```

## Usage

When using `node-sass` reccomend using the `--include-path` flag to make imports from `node_modules` pretty.

```
$ node-sass src/app.scss -o public --include-path node_modules
```

Import one of the icon styles and use an icon by passing a color to an icon function.

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

## How to build

Beware, cloning `google/material-design-icons` repo takes a while.

```
$ git clone https://github.com/whaaaley/material-icons-scss.git
$ cd material-icons-scss
$ git clone https://github.com/google/material-design-icons.git
$ make
```
