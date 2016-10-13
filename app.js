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
var User = require('./models/user')
var bodyParser = require('body-parser');

var port = process.env.PORT || 3033;
var app = express();

mongoose.connect('mongodb://localhost/nodemovie')

app.set('views', './views/pages');
app.set('view engine', 'jade');
// app.use(bodyParser());//Now deprecated
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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

// 用户注册
app.post('/user/signup', function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.send({message: "error", info: "username is exist"});
        } else {
            var user = new User(_user);

            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.send({message: "success", url: "/admin/userlist"});

                // res.redirect('/admin/userlist');
                // console.log("user: " + user);
                // console.log("_user: " + _user);
            });
        }
    })


});

// 用户列表页
app.get('/admin/userlist', function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: '用户列表',
            users: users
        })
    })
});


app.get('/test', function (req, res) {

});
