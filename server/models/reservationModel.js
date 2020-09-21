const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    number: Number,
    date: String,
    timeStart: Number,
    timeEnd: Number,
    people: Number,
    tableId: String
});

module.exports = mongoose.model('Reservations', reservationSchema);