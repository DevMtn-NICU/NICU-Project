// Hospital model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, minlength: 7, maxlength: 10, required: true },  //formatting of the number needs to be done on front end
    email: { type: String, match: [/.+\@.+\..+/, "Please fill a valid e-mail address"], required: true, unique: true},
    
    nurses: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    babies: [{ type: Schema.Types.ObjectId, ref: 'Baby' }],
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hospital', hospitalSchema);