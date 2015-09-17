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
      type: String,
      required: true
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
      required: true,
      //select: false
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
      babies: [{
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
   console.log('presave loaded');
   var user = this;
   bcryptPasswordChecker(user, next);
});

userSchema.pre('update', function (next) {
   console.log('update');
});


userSchema.methods.validPassword = function (password) {
   var newPass = this.generateHash(password);
   //console.log(newPass);
   return bcrypt.compareSync(password, this.password);
};




//Password encryption methods
userSchema.methods.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//userSchema.methods.comparePassword = function (newPassword, cb) {
//   bcrypt.compareSync(newPassword, this.password, function (err, isMatch) {
//      if (err) console.log('error in user server model');
//      cb(null, isMatch);
//   })
//};



var bcryptPasswordChecker = function (user, next) {
   if (!user.isModified('password')) {
      console.log('!user');
      return next();
   }


   bcrypt.genSalt(8, function (err, salt) {
      console.log('bcrypt.genSalt');
      if (err) {
         console.log('error');
         return next(err);
      }


      bcrypt.hash(user.password, salt, null, function (err, hash) {
         console.log("user pasword = ", user.password);
         if (err) return next(err);
         user.password = hash;
         next();
      });
   });
};


module.exports = mongoose.model('User', userSchema);
