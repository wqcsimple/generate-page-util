const fs        = require('fs');
const path      = require('path');
const mkdirp    = require('mkdirp');
const Util      = require('./lib/util');
const Log       = require('./lib/logger');

// js: false,
// json: false,
// less: false,
// scss: false,
// css: false,
// xml: false,
// html: false,
// vue: false,

function generatePage(options) {
    if (typeof options !== 'object') {
        Log.e('options must be a object.');
        return false;
    }

    options = Object.assign({
        root: "",
        name: "",
        pathName: "",
        params: {},
        fileTypes: [],
        templateType: "",  // wx angular-1
    }, options);

    if (!Util.containsKey(options, ['root']) && !options.root) {
        Log.e("You must specify a root directory.");
        return false;
    }

    let pageRoot = path.resolve(options.root, options.pathName);

    // 判断目录是否已经创建
    if (!fs.existsSync(pageRoot)) {
        mkdirp.sync(pageRoot);
    }

    if (!Util.containsKey(options, ['fileTypes']) && options.fileTypes.length <= 0) {
        Log.e("options file types not be empty!");
        return false;
    }

    let results = [];
    options.fileTypes.map(item => {
        results.push(processTemplate(pageRoot, options, item.toLowerCase()));
    });

    return results
}

function processTemplate(pageRoot, options, type) {
    let template = require(`./template/${options.templateType}/` + type);
    let templatePath = path.resolve(pageRoot, options.name + "." + type);
    if (fs.existsSync(templatePath)) {
        Log.i(templatePath + " exists");
    } else {
        fs.writeFileSync(templatePath, template(options.params));
    }
    return templatePath;
}

module.exports = generatePage;
