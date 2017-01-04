/**
 * Created by whis on 1/4/17.
 */
const generatePage = require('../')

const angularFiles = generatePage({
    root: __dirname,
    name: "admin-detail",
    pathName: "admin",
    controller: "AdminDetailController",
    scss: true,
    html: true,
    // templateType: "wx",
    templateType: "angular-1"
});

console.log(angularFiles);

const wxFiles = generatePage({
    root: __dirname,
    name: "whis",
    scss: true,
    html: true,
    json: true,
    templateType: "wx",
});

console.log(wxFiles);
