const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moneySchema = new Schema({
    treasureid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Treasure'
        
    },
    amt: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Moneyvalue', moneySchema);