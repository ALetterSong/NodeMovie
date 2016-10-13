/**
 * movie.js
 * 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
 *
 * Created by xiepan on 2016/10/11 14:06.
 */

var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;