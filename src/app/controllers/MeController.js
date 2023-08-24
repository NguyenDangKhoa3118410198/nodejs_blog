const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../ulti/mongoose')

class MeController {
    async storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
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
