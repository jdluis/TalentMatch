
const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    message: {
        type: String,
        trim: true
    },
    transmitter: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'docmodel'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'docmodel'
    },
    docmodel: {
        type: String,
        required: true,
        enum: ['Dev', 'Company']
    }
});

const Message = model('Message', messageSchema);

module.exports = Message;