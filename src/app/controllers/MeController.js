const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
    async storedCourses(req, res, next) {
        await Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
