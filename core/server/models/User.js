// user model
var mongoose = require('mongoose'),
    bcrypt = reqruire('bcrypt-nodejs');
    Schema = mongoose.Schema;

var userSchema = new Schema({
  role: {type: String, required: true, enum: ["nurse", "parent", "contact"]},
  //match checks for valid email
  email: {type: String, match: [/.+\@.+\..+/, "Please fill a valid e-mail address"], required: true, unique: true},
  password: {type: String, required: true},
  nurse: {
    access: {type: String, enum: ["nurse"]}
  },
  parent: {
    access: {type: String, enum: ["parent"]},
    baby: {type: Schema.Types.ObjectId}
  },
  created_at: {type: Date, default: Date.now}
});

//run during passport user creation, hashes out password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//run during validation, unhashes pw, validates, and rehashes
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
