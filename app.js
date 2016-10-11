/**
 * app.js
 *
 * Created by xiepan on 2016/10/11 09:49.
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie')
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/nodemovie')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('started on port ' + port);

// 首页
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'Node Cinema',
            movies: movies
        })
    })

});

// 电影详情页
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '详情：' + movie.title,
            movie: movie

        })
    })

});

// 后台录入页
app.get('/admin', function (req, res) {
    res.render('admin', {
        title: '录入信息',
        movie: {
            title: '',
            doctor: '',
            country: '',
            language: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
        }
    })
});

// 后台更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '更新',
                movie: movie
            })
        })
    }
});

app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        })
    }
});

// 列表页
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: '列表',
            movies: movies
        })
    })
});

// 删除
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;

    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1})
            }
        })
    }
});
