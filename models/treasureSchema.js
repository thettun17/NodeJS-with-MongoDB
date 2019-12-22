const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treasureSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Treasure', treasureSchema);