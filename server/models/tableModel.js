const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: Number,
    seats: Number,
    reserved: Boolean
})

module.exports = mongoose.model('Tables', tableSchema);