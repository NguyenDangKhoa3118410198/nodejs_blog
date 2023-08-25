const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../ulti/mongoose')

class MeController {
    async storedCourses(req, res, next) {
        let courseQuery = Course.find({})
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount: deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next)
    }

    async trashCourses(req, res, next) {
        await Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }
}

module.exports = new MeController()
