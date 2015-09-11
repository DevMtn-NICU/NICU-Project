var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var noteSchema = new Schema({
  baby: {type: Schema.Types.ObjectId, ref: "Baby"}
});
