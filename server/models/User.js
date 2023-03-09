const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        productId: {
            type: String,
        },
        username: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            sparse: true
        },
        contact: {
            type: Number
        },
        address: {
            type: String
        },
        pincode: {
            type: Number
        },
        location: {
            type: String,
            default: null
        },
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
