// Hospital model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    
    name: String,
    address: String,
    phone: {type: Number, minlength: 7, maxlength: 10},  //formatting of the number needs to be done on front end
    email: {type: String, match: [/.+\@.+\..+/, "Please fill a valid e-mail address"], required: true, unique: true},
    
    nurses: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hospital', hospitalSchema);