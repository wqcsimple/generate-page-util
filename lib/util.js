/**
 * @author whis admin@wwhis.com
 * @Created 4/27/17
 */
const Log = require('./logger');
const fs = require('fs');
const PHPJS = require("locutus").php;
const path = require('path');

const EJS = require('ejs');

function containsKey(object, keys) {
    if (!object) {
        return false;
    }

    if (!(keys instanceof Array)) {
        keys = ['' + keys];
    }

    for (var i in keys) {
        var key = keys[i];
        if (object[key] === undefined) {
            Log.e(object);
            Log.e(keys);
            Log.e(`invalid option, key ${key} undefined`);
            return false;
        }
    }

    return true;
}

function renderTemplate(path, data) {
    return new Promise(function (resolve, reject) {
        EJS.renderFile(path, data, {}, (error, output) => {
            if (!error && output) {
                resolve(output);
            } else {
                reject(error);
            }
        });
    });
}

function writeFile(path, content, option) {
    if (!content) {
        return Promise.reject('invalid content');
    }
    Log.d('write path:', path);
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, option, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

function rmdirSync(dirpath) {
    if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
        let files = fs.readdirSync(dirpath);
        files.forEach(function (file, index) {

            let curPath = path.join(dirpath, file);
            if (fs.statSync(curPath).isDirectory()) {
                rmdirSync(curPath);
            } else {
                console.log(curPath);
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirpath);
    }
}

module.exports.containsKey = containsKey;
module.exports.renderTemplate = renderTemplate;
module.exports.writeFile = writeFile;
module.exports.firstUpperCase = firstUpperCase;
module.exports.rmdirSync = rmdirSync;
module.exports.trim = PHPJS.strings.trim;
module.exports.inArray = PHPJS.array.in_array;
