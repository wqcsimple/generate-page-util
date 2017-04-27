/**
 * Created by whis on 1/4/17.
 */
const generatePage = require('../index')

let angularFiles = generatePage({
    root: __dirname + "/../src/angular",
    name: "admin-detail",
    pathName: "admin",
    params: {
        controller: "AdminDetailController"
    },
    fileTypes: ['scss', 'html', 'js'],
    templateType: "angular-1"
});

let wxFiles = generatePage({
    root: __dirname + "/../src/wx",
    name: "whis",
    fileTypes: ['scss', 'html', 'json', 'js'],
    templateType: "wx",
});


let vueFiles = generatePage({
    root: __dirname + "/../src/views",
    name: "list",
    pathName: "waybill",
    fileTypes: ['vue'],
    templateType: "vue"
});

// console.log(angularFiles);

// console.log(wxFiles);

// console.log(vueFiles);