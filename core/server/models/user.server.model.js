// user model
var mongoose = require('mongoose'),
   bcrypt = require('bcrypt-nodejs'),
   Schema = mongoose.Schema;




var userSchema = new Schema({
   roles: [{
      type: String,
      required: true,
      enum: ["nurse", "parent", "contact"]
   }],
   name: {
      type: String
   },
   //match checks for valid emails
   email: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   nurse: {
      access: {
         type: String,
         enum: ["nurse"]
      }
   },
   parent: {
      access: {
         type: String,
         enum: ["parent"]
      },
      baby: [{
         type: Schema.Types.ObjectId,
         ref: "Baby"
      }]
   },
   created_at: {
      type: Date,
      default: Date.now,
      required: true
   }
});

userSchema.pre('save', function (next) {
   var user = this;
   if (!user.isModified('password')) {
      return next();
   }
   bcrypt.genSalt(12, function (err, salt) {
      if (err) {
         return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
         console.log(user.password);
         user.password = hash;
         return next();
      });
   });
});

//Password encryption methods
userSchema.methods.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
   return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
