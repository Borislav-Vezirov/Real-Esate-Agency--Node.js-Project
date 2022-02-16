const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name            : {type: String, required: true, minlength: 6},
    type            : {type: String, enum: ['Apratment','Villa', 'House'], required: true},
    year            : {type: Number, required: true, min: 1850, max: 2021},
    city            : {type: String, required: true, minlength: 4},
    image           : {type: String, required: true, match: /^https?:\/\//i},
    description     : {type: String, required: true, maxlength: 60},
    availablePieces : {type: Number, required: true, min: 0, max: 10},
    tenants         : [{type: mongoose.Types.ObjectId, ref: 'User'}],
    owner           : {type: mongoose.Types.ObjectId, ref: 'User'}

},
{
    timestamps: true
}
);

userSchema.method('getTenants', function(){

    return this.tenants.map(x => x.name).join(', ');
})

const Housing = mongoose.model('Housing', userSchema);

module.exports = Housing;