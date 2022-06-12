//REQUIRE
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//REACTION SCHEMA
const ReactionSchema = new Schema(
    {
        //SET CUSTOM ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

//THOUGHT SCHEMA
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        //PREVENTS DUPLICATION -  _id as `id`
        id: false
    }
)

//COUNT - Total reactions & replies
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//THOUGHT
const Thought = model("Thought", ThoughtSchema);

//EXPORT
module.exports = Thought;