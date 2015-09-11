// user model
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var userSchema = new Schema ({
  role: {type: String, required: true, enum: ["parent", "nurse", "contact"]},
  //match checks for valid email with "@" and "."
  email: {type: String, match: [/.+\@.+\..+/, "Please fill a valid e-mail address"], required: true},
  password: {type: String, required: true},
  nurse: {
    access: {type: String, enum: ["nurse"]}
  },
  parent: {
    access: {type: String, enum: ["parent"]},
    baby: {type: Schema.Types.ObjectId, ref: "Baby"}
  },
  created_at: {type: Date, default: Date.now()}
});

//Use this function when creating a user, hashes out the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
