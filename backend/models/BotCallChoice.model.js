
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    tgname: { type: String, required: true },
    choice: { type: String, required: true },
});

const BotCallChoice = mongoose.model('BotCallChoice', choiceSchema);

module.exports = BotCallChoice;