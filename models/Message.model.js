
const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    message: {
        type: String,
        trim: true
    },
    transmitter: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'transmitterModel'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverModel'
    },
    transmitterModel: {
        type: String,
        required: true,
        enum: ['Dev', 'Company']
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['Dev', 'Company']
    },
});

const Message = model('Message', messageSchema);

module.exports = Message;