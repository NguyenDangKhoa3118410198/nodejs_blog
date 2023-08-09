const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class SiteController {
    async home(req, res, next) {
        await Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
