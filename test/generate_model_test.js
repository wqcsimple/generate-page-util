/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel

// let dbConfig = {
//     host: "db",
//     user: "root",
//     password: "7",
//     database: "supervision_api",
//     table: ['case_call_log'],
//     writePath: `${__dirname}/ejs`
// };

let dbConfig = {
  host: '106.14.135.129',
  user: 'dev',
  password: 'rDbKU6Qy4XhwKpKl',
  database: 'cook_robot',
  table: ['account', 'action', 'advertising', 'authority', 'category', 'coupon', 'customer', 'customer_address',
    'customer_coupon', 'customer_money', 'customer_point', 'device', 'device_fault', 'device_menu', 'feedback',
    'goods', 'goods_stock', 'menu', 'menu_goods', 'order', 'order_evaluate', 'order_food', 'order_info', 'order_refund_record',
    'pay', 'pay_notification', 'role', 'role_authority', 'shopping_cart', 'storage', 'store', 'sys_config', 'sys_oper_log',
    'token', 'user', 'user_bind', 'user_role', 'worker_device'],
  writePath: `${__dirname}/ejs`
}

generateModel(dbConfig)

// let a = '1';
// let b = ['1'];
//
// console.log(typeof  a)
// console.log(Array.isArray(b))
