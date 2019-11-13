const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    teamName: { type: String, required: true},
    score: { type: Object, required: true},
    sum: { type: String, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', schema);
