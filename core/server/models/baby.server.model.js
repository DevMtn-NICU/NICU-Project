// baby model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var babySchema = new Schema({
    firstName: String,
	middleName: String,
    lastName: String,
	
	nurses: [{ type: Schema.Types.ObjectId, ref: 'User' }], //this might not be necessary?
	parents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    
    level1: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    level2: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    level3: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    birthWeight: String,
    birthLength: String,
    
    birthDate: Date,
    dischargeDate: Date, 
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Baby', babySchema);