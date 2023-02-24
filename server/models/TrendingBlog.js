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
        meta: {
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const TrendingBlog = mongoose.model('trending_blog', BlogSchema);

module.exports = { TrendingBlog };
