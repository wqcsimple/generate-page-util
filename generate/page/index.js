/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const fs        = require('fs');
const path      = require('path');
const mkdirp    = require('mkdirp');
const colors    = require('colors');
const Util      = require('../../lib/util');
const Log       = require('../../lib/logger');

// colors config
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    success: 'green',
    error: 'red'
});

// js: false,
// json: false,
// less: false,
// scss: false,
// css: false,
// xml: false,
// html: false,
// vue: false,

function generatePage(options) {
    if (!options) {
        Log.e("options is not set");
        return false;
    }

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
        templatePath: "", // user template path
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
    let templatePath = options.templatePath ? options.templatePath : __dirname + '/template';
    let template = require(`${templatePath}/${options.templateType}/` + type);

    let outPath = path.resolve(pageRoot, options.name + "." + type);

    if (fs.existsSync(outPath)) {
        Log.i(outPath + " [exists]".error);
    } else {
        fs.writeFileSync(outPath, template(options.params));
        Log.i(outPath + " [create success]".success);
    }
    return outPath;
}

module.exports = generatePage;
