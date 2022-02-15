const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
        name            : {type: String, required: true},
        type            : {type: String, enum: ['Apratment','Villa', 'House'], required: true},
        year            : {type: Number, required: true},
        city            : {type: String, required: true},
        image           : {type: String, required: true},
        description     : {type: String, required: true},
        availablePieces : {type: Number, required: true},
        // rentedAHome     : {ref: 'User'},
        owner           : {type: mongoose.Types.ObjectId, ref: 'User'}

    },
    {
        timestamps: true
    }
);

const Housing = mongoose.model('Housing', userSchema);

module.exports = Housing;