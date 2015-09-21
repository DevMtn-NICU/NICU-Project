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
   contact: [{
     baby: {
       type: Schema.Types.ObjectId,
       ref: "Baby"
     },
     level: {
       type: String,
       enum: ["level1", "level2"]
     }
   }],
   created_at: {
      type: Date,
      default: Date.now,
      required: true
   }
});




//this only runs on user.save() it won't work work with user.update()
userSchema.pre('save', function (next) {
   console.log('presave loaded');
   var user = this;
   bcryptPasswordChecker(user, next);
});

//methods for the user schema
userSchema.methods.validPassword = function (password) {
   console.log(password);
   var newPass = this.generateHash(password);
   console.log(bcrypt.compareSync(password, this.password));
   return bcrypt.compareSync(password, this.password);
};


//Password encryption methods
userSchema.methods.generateHash = function (password) {
   console.log('bcrypt hash');
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


bcrypt.genSalt(8, function (err, salt) {
   console.log('bcrypt.genSalt');
   if (err) {
      console.log('error');
      return next(err);
   }
});

var bcryptPasswordChecker = function (user, next) {
   if (!user.isModified) {
      console.log('error password is the same');
      return next();
   }

   bcrypt.genSalt(8, function (err, salt) {
      console.log('bcrypt.genSalt');
      if (err) {
         console.log('error');
         return next(err);
      }


      bcrypt.hash(user.password, salt, null, function (err, hash) {
         if (err) return next(err);
         user.password = hash;
         console.log(user.password);
         next();
      });
   });
};


//userSchema.methods.comparePassword = function (newPassword, cb) {
//   bcrypt.compareSync(newPassword, this.password, function (err, isMatch) {
//      if (err) console.log('error in user server model');
//      cb(null, isMatch);
//   })
//};



module.exports = mongoose.model('User', userSchema);
