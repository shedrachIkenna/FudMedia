import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },

        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },

        picturePath: {
            type: String,
            default: ''
        },

        friends: {
            type: Array,
            default: []
        },

        location: String,
        occupation: String,
        viewingProfile: Number,
        impressions: Number,

    }, { timeStamps: true } 
);

const User = mongoose.model('User', UserSchema);
export default User