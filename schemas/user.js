/**
 * user.js
 * 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
 *
 * Created by xiepan on 2016/10/12 11:04.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var SALT_WORK_FACTORY = 10;

var UserSchema = new mongoose.Schema({
        name: {
            unique: true,
            type: String,
        },
        password: String,
        meta: {
            createAt: {
                type: Date,
                default: Date.now()
            }
            ,
            updateAt: {
                type: Date,
                default: Date.now()
            }
        }
    })
    ;

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTORY, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },

    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = UserSchema;