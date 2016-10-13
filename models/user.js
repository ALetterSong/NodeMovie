/**
 * user.js
 * 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
 *
 * Created by xiepan on 2016/10/13 10:12.
 */

var mongoose = require('mongoose');
var ÚserSchema = require('../schemas/user');
var User = mongoose.model('User', ÚserSchema);

module.exports = User;