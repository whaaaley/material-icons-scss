
# material-icons-scss

> Material design icon functions for SCSS

This project contains and generates SCSS functions that output SVG Data URLs using SVGs from the official [google/material-design-icons](https://github.com/google/material-design-icons) repository, optimized using [SVGO](https://github.com/svg/svgo) and this project.

## Notice
You can see all the current icons in their data URL form at the following locations.

+ [stable/filled](https://demo-dist.netlify.app/stable/filled.html)
+ [stable/outlined](https://demo-dist.netlify.app/stable/outlined.html)
+ [stable/round](https://demo-dist.netlify.app/stable/round.html)
+ [stable/sharp](https://demo-dist.netlify.app/stable/sharp.html)
+ [stable/twotone](https://demo-dist.netlify.app/stable/twotone.html)

+ [extended/filled](https://demo-dist.netlify.app/extended/filled.html)
+ [extended/outlined](https://demo-dist.netlify.app/extended/outlined.html)
+ [extended/round](https://demo-dist.netlify.app/extended/round.html)
+ [extended/sharp](https://demo-dist.netlify.app/extended/sharp.html)
+ [extended/twotone](https://demo-dist.netlify.app/extended/twotone.html)

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

The icons in `stable` are the 4.0.0 icons _only_ whereas the icons in `extended` include all the icons from 4.0.0 plus all the icons seen on Google fonts. Extended icons have not stabilized and may be subject to change.

You can find a list of all available _extended_ icons, styles, and sizes on [Google Fonts.](https://fonts.google.com/icons?selected=Material+Icons)

```scss
@import '@whaaaley/material-icons-scss/stable/filled';
@import '@whaaaley/material-icons-scss/stable/outlined';
@import '@whaaaley/material-icons-scss/stable/round';
@import '@whaaaley/material-icons-scss/stable/sharp';
@import '@whaaaley/material-icons-scss/stable/twotone';

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

This builds both `stable` and `extended` icon sets and demo files.

**`Notice:`** Running `update_repo.py` can take over 2 hours to download all the files.

```
$ cd icons/stable
$ git clone https://github.com/google/material-design-icons.git
$ cd ..
$ cd extended
$ git clone https://github.com/google/material-design-icons.git
$ cd material-design-icons/update
$ pip3 install -r requirements.txt
$ python3 update_repo.py
$ cd ../../..
$ make optimize
$ make build
```
