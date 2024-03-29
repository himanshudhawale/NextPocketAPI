const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {  useCreateIndex: true, useNewUrlParser: false });
mongoose.Promise = global.Promise;

module.exports = {
    Team: require('../users/team.model')
};
