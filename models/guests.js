const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const guestSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    contact : {
        type:   Number,
        required: true
    },
    purpose : {
        type: String,
        required: false
    },
    arrival_time :{
        type: String,
        required: true
    },
    departure_time : {
        type: String,
        required: true
    },
    id_image: {
        type: String,
        required: true
    },
    length_of_stay: {
        type: Number,
        default: true      
    }
}, {
    timestamps: true     
});

module.exports = mongoose.model('guest', guestSchema);   
