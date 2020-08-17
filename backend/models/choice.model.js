
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    tgname: { type: String, required: true },
    choice: { type: String, required: true },
}, {
    timestamps: true,
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;