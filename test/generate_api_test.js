/**
 * @author whis admin@wwhis.com
 * @Created 11/30/18
 */
const generateApi = require('../index').generateApi;

let config = {
    url: "https://ly.api.wwhis.com/v2/api-docs?group=gradle-spring-boot",
    writePath: `${__dirname}/ejs`
};

generateApi(config);


