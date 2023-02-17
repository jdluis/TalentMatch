
const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
    messages: {
        type: String,
        trim: true
    },
    devId: {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;