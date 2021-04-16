
# material-icons-scss

> Material design icon functions for SCSS

This project contains and generates SCSS functions that output SVG Data URLs using SVGs from the official [google/material-design-icons](https://github.com/google/material-design-icons) repository, optimized using [SVGO](https://github.com/svg/svgo) and this project.

You can find a list of all available icons, styles, and sizes on [Google Fonts.](https://fonts.google.com/icons?selected=Material+Icons)

## Notice
Currently, there are bugs. Unfortunately there are a number of issues inside Google's source SVGs themselves. I'm doing my best to work on these issues over time and correct them through the conversion process. On the bright side, over 95% of icons do work and are even smaller than the ones you'll get from Google. You can see all the current icons in their data URL form at the following locations.
+ [filled](https://demo-dist.netlify.app/filled.html)
+ [outlined](https://demo-dist.netlify.app/outlined.html)
+ [round](https://demo-dist.netlify.app/round.html)
+ [sharp](https://demo-dist.netlify.app/sharp.html)
+ [twotone](https://demo-dist.netlify.app/twotone.html)

There are a number of known icons that cannot be fixed with the current SVG source files.
+ filled/ic-repeat-on-24px
+ filled/ic-repeat-one-on-24px
+ filled/ic-shuffle-on-24px

## Install

```
$ npm i @whaaaley/material-icons-scss
```

## Setup

If you're using the `dart-sass` CLI I recommend using the `--load-path` flag set to `node_modules`. Load paths add additional paths for Sass to look for stylesheets.

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

First, import a stylesheet of the icon style you'd like to use. Only import one of the following.

The icons in `style` are the 4.0.0 icons _only_ whereas the icons in `extended` include all the icons from 4.0.0 plus all the icons seen on Google fonts. Extended icons have not stablized and may be subject to change or removal.

```scss
@import '@whaaaley/material-icons-scss/style/filled';
@import '@whaaaley/material-icons-scss/style/outlined';
@import '@whaaaley/material-icons-scss/style/round';
@import '@whaaaley/material-icons-scss/style/sharp';
@import '@whaaaley/material-icons-scss/style/twotone';

@import '@whaaaley/material-icons-scss/extended/filled';
@import '@whaaaley/material-icons-scss/extended/outlined';
@import '@whaaaley/material-icons-scss/extended/round';
@import '@whaaaley/material-icons-scss/extended/sharp';
@import '@whaaaley/material-icons-scss/extended/twotone';
```

Next, create an icon data URL by using one of the icon functions.

Icon function names are prefixed with `ic`, names are kebab cased, and sizes can be 18px, 20px, or 24px.

```
ic-name-size($color)
```

In this example, I'm storing the SVG data URL in the variable `$icon-menu` then using that variable in the background URL function.

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

### Building 4.0.0 Icon Set

```
$ cd icons/4.0.0
$ git clone https://github.com/google/material-design-icons.git
$ cd ../..
$ make
```

### Building Extended Icon Set

This also includes the base set. Extended icons are only available through Google's update script found in their GitHub repo which downloads the icons from their servers.

**`Notice:`** Running `update_repo.py` can take over 2 hours to download all the files.

```
$ cd icons/extended
$ git clone https://github.com/google/material-design-icons.git
$ cd material-design-icons/update
$ pip3 install -r requirements.txt
$ python3 update_repo.py
$ cd ../../../..
$ make
```
