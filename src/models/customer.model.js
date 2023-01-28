const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, require: true },
    number_phone: Number,
    contract: { type: String, require: true },
    room_number: Number,
},{ timestamps: true } );

module.exports = mongoose.model("Customer", customerSchema);