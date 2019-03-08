/**
 * @author whis admin@wwhis.com
 * @Created 11/30/18
 */
const generateApi = require('../index').generateApi;

let config = {
    url: "http://localhost:9888/v2/api-docs?group=gradle-spring-boot",
    prefix: "/customer/1",
    writePath: `${__dirname}/ejs`
};

generateApi(config);


