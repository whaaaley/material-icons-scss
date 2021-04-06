
# material-icons-scss

> Material design icon functions for SCSS

This project contains and generates SCSS functions that output SVG Data URLs using SVGs from the official [google/material-design-icons](https://github.com/google/material-design-icons) repository, optimized using [SVGO](https://github.com/svg/svgo) and this project.

You can fine a list of all available icons, styles, and sizes on [Google Fonts.](https://fonts.google.com/icons?selected=Material+Icons)

## Install

```
$ npm i @whaaaley/material-icons-scss
```

## Setup

If you're using the `dart-sass` cli I reccomend using the `--load-path` flag set to `node_modules`. Load paths add additional paths for Sass to look for stylesheets.

```
$ sass src/app.scss public/app.min.css --load-path=node_modules
```

If you're using `dart-sass`'s JavaScript API this is called `includePaths`.

```js
const css = sass.renderSync({
  file: 'src/app.js',
  includePaths: ['node_modules']
})
```

## Usage

First, import a stylesheet of the icon style you'd like to use. Only import one of the following:

```scss
@import '@whaaaley/material-icons-scss/style/filled';
@import '@whaaaley/material-icons-scss/style/outlined';
@import '@whaaaley/material-icons-scss/style/round';
@import '@whaaaley/material-icons-scss/style/sharp';
@import '@whaaaley/material-icons-scss/style/twotone';
```

Next, create an icon data URL by using one of the icon functions.

Icon function names are prefixed with `ic`, names are kebab cased, and sizes can be 18px, 24px, 36px, or 48px.

```
ic-name-size($color)
```

In this example I'm storing the SVG data URL in the variable `$icon-menu` then using that variable in the background URL function.

### Input:

```scss
@import '@whaaaley/material-icons-scss/style/filled';

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
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="%23f00" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>') center no-repeat;
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
