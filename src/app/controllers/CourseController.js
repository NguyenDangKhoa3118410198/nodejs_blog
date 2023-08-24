const Course = require('../models/Course')
const { mongooseToObject } = require('../../ulti/mongoose')

class CourseController {
    async show(req, res, next) {
        await Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    create(req, res, next) {
        res.render('courses/create')
    }

    async store(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        const course = new Course(formData)
        await course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {})
    }

    async edit(req, res, next) {
        await Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', { course: mongooseToObject(course) })
            )
            .catch(next)
    }

    async update(req, res, next) {
        await Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    async delete(req, res, next) {
        await Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    async restore(req, res, next) {
        await Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    async forceDelete(req, res, next) {
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController()
