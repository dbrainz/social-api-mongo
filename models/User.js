const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [thoughtSchema],
        friends: [ {type: isObjectIdOrHexString, ref: 'User' }]
    }
)

module.exports = userSchema;