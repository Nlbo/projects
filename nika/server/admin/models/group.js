const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    line: {
        large: {
            order: {
                type: Number,
                default: 0
            },
            large: {
                type: [Schema.Types.ObjectId],
                ref: 'Block'
            },
            middle: {
                type: [Schema.Types.ObjectId],
                ref: 'Block'
            },
            small: {
                type: [Schema.Types.ObjectId],
                ref: 'Block'
            }
        },
        middle: {
            order: {
                type: Number,
                default: 0
            },
            middle: {
                type: [Schema.Types.ObjectId],
                ref: 'Block'
            },
            small: {
                type: [Schema.Types.ObjectId],
                ref: 'Block'
            }
        },
    },
});

module.exports = mongoose.model('Group', GroupSchema);
