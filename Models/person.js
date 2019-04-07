const mongoose = require('mongoose');
const schema = require('../Schema/schema');
module.exports = mongoose.model('persons', schema.person);