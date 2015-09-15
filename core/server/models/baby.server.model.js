// Baby model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var babySchema = new Schema({
    firstName: { type: String, required: true },
	middleName: { type: String },
    lastName: { type: String, required: true },

    gender: { type: String, enum: ["Male", "Female"], required: true },
    patientNumber: {type: Number, required: true},

	parents: [{parent: { type: Schema.Types.ObjectId, ref: 'User' }}],
    notes: [{note: { type: Schema.Types.ObjectId, ref: 'Note' }}],

    level1: [{user: { type: Schema.Types.ObjectId, ref: 'User' }}],
    level2: [{user: { type: Schema.Types.ObjectId, ref: 'User' }}],
    level3: [{user: { type: Schema.Types.ObjectId, ref: 'User' }}],

    birthWeight: { type: String, required: true },
    birthLength: { type: String, required: true },

    birthDate: { type: Date, required: true },
    dischargeDate: Date,
    deathDate: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Baby', babySchema);
