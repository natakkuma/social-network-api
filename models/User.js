//REQUIRE
const { Schema, model } = require('mongoose');

//USER SCHEMA
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
)

//COUNT - total friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//CREATE - user model w/ Schema
const User = model('User', UserSchema);

//EXPORT
module.exports = User;