const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        meta_description: {
            type: String,
            trim: true
        },
        quiz_questions: {
            type: Array,
            trim: true
        },
        quiz_answers: {
            type: Array,
            trim: true 
        },
        html: {
            type: String,
        },
        meta: {
            GrabOfferCount: {
                type: Number
            },
            isOfferValid: {
                type: Boolean
            }
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = { Blog };
