# generate-weapp-page

> Auto generate page


## Install

```

```


## Usage

```js
const generatePage = require('generate-weapp-page')

const files = generatePage({
  name: 'index',
  json: false,
  less: true,
  scss: false,
  css: false
})
console.log(files)
```


## Node.js API

### generatePage(options, callback)

#### options

Type: `Object`

options.

#### return files

Type: `Array` or `Boolean`

Generated files or exists