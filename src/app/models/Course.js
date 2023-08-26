const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)
mongoose.set('strictQuery', false)
const Schema = mongoose.Schema

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
)
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}

mongoose.plugin(slug)
CourseSchema.plugin(AutoIncrement)
CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('Course', CourseSchema)
