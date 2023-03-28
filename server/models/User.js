const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        productId: {
            type: String,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
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
        state: {
            type: String
        },
        city: {
            type: String
        }
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
