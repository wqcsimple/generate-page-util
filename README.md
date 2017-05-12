# generate-page-util

> Auto generate page util


## Install

```
"dependencies": {
    "generate-page-util": "https://github.com/wqcsimple/generate-page-util.git"
  }
```

## Usage
> 详细用法见test/index.js
```js

let generatePage = require('generate-page-util')

let files = generatePage({
      root: __dirname + "/../src/angular",
      name: "admin-detail",
      pathName: "admin",
      params: {
          controller: "AdminDetailController"
      },
      fileTypes: ['scss', 'html', 'js'],
      templateType: "vue",
      templatePath: "",
})

console.log(files)

```

| 参数 | 意义  | 可选值 |
| ------------ | ------------ | ------------ |
|  root | 生成文件根目录  | `__dirname` |
|  name | 生成文件名 |   |
|  pathName | 根目录下子目录 | 可为空  |
|  params | 模板中参数 | 可为空  |
|  fileTypes | 需要生成文件的参数 | js, json, less, scss, css, xml, html, vue  |
|  templateType | 需要生成的文件模板类型 | vue, wx, angular-1  |
|  templatePath | 用户自定义模板路径 | 默认为空，`__dirname + '/template'`  |



## Features
- Support for template customization