/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */

const Util      = require('../lib/util');
const mkdirp    = require('mkdirp');
const fs        = require('fs');

let writePath = `${__dirname}/ejs`;
let templatePath = `${__dirname}/template/model.ejs`;
Util.renderTemplate(templatePath, {
    dataList: [
        {name: 'whis', 'age': 1},
        {name: 'whis-2', 'age': 2},
    ]
})
    .then(data => {
        if (!fs.existsSync(writePath)) {
            mkdirp.sync(writePath);
        }

        Util.writeFile(writePath + "/model.java", data, {mode: 0o755});
    });


