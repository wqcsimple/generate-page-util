const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

function generatePage(options) {
    if (typeof options !== 'object') throw new Error('options must be a object.')

    options = Object.assign({
        root: "",
        name: "index",
        json: false,
        less: false,
        scss: true,
        css: false,
        xml: false,
        html: true,
        pathName: "",
        controller: "",
        templateType: "wx",  // wx angular-1
    }, options);

    if (!options.root) throw new Error('You must specify a root directory.');

    const pageRoot = path.resolve(options.root, options.pathName || options.name);

    if (fs.existsSync(pageRoot)) return false;

    mkdirp.sync(pageRoot);

    const results = [];

    // js
    results.push(processTemplate(pageRoot, options, 'js'));

    // xml
    if (options.xml) {
        results.push(processTemplate(pageRoot, options, 'xml'))
    }

    // html
    if (options.html) {
        results.push(processTemplate(pageRoot, options, 'html'))
    }

    // less
    if (options.less) {
        results.push(processTemplate(pageRoot, options, 'less'))
    }
    // scss
    if (options.scss) {
        results.push(processTemplate(pageRoot, options, 'scss'))
    }
    // css
    if (options.css) {
        results.push(processTemplate(pageRoot, options, 'css'))
    }
    // json
    if (options.json) {
        results.push(processTemplate(pageRoot, options, 'json'))
    }

    return results
}

function processTemplate(pageRoot, options, type) {
    const template = require(`./templates/${options.templateType}/` + type);
    const templatePath = path.resolve(pageRoot, options.name + "." + type);
    fs.writeFileSync(templatePath, template(options));
    return templatePath;
}

module.exports = generatePage;
