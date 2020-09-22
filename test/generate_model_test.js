/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel;

// let dbConfig = {
//     host: "db",
//     user: "root",
//     password: "7",
//     database: "supervision_api",
//     table: ['case_call_log'],
//     writePath: `${__dirname}/ejs`
// };

let dbConfig = {
  host: "106.14.135.129",
  user: "dev",
  password: "rDbKU6Qy4XhwKpKl",
  database: "phm_api",
  table: ['account', 'authority', 'device', 'device_action', 'device_event_action', 'device_fault_event',
      'device_task', 'device_task_approval', 'device_task_member', 'device_warn_event', 'org', 'pay', 'pay_notification',
      'role', 'role_authority', 'soft_update_log', 'subscribe_item', 'subscribe_item_link', 'subway_line', 'subway_station',
      'sys_config', 'sys_menu', 'token', 'train', 'train_carriage', 'train_door_sensor', 'user', 'user_authority', 'user_bind',
      'user_oper_log', 'user_role', 'vendor_component', 'vendor_vehicle'],
  writePath: `${__dirname}/ejs`
};

generateModel(dbConfig);


// let a = '1';
// let b = ['1'];
//
// console.log(typeof  a)
// console.log(Array.isArray(b))
