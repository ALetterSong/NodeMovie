/**
 * movie.js
 *
 * Created by xiepan on 2016/10/11 14:06.
 */

var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;