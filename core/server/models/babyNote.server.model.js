var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var noteSchema = new Schema({
  baby: {type: Schema.Types.ObjectId, ref: "Baby", required: true},
  picturesUrl: {type: String},
  stats: {
    bloodPressure: {type: String},
    heartRate: {type: Number, min: 0},
    oxygen: {type: Number, min: 0},
    weight: {type: String},
    other: [{
      stat: {type: String},
      value: {type: String}
    }],
    fed: {type: Boolean, default: false},
    changed: {type: Boolean, default: false},
    bathed: {type: Boolean, default: false}
  },
  comment: {type: String},
  journal: {type: String},
  created_at: {type: Date, default: Date.now, required: true},
  creator: {type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Note', noteSchema);
