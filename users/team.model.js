const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//discount, name, photo, price, region

const schema = new Schema({
    teamName: { type: String, required: true},
    score: { type: String, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', schema);
