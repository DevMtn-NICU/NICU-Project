// Baby model
var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var babySchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   middleName: {
      type: String
   },
   lastName: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      enum: ["Male", "Female", "Unassigned"],
      required: true
   },
   patientNumber: {
      type: Number,
      required: true,
      unique: true
   },
   parents: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   notes: [{
      type: Schema.Types.ObjectId,
      ref: 'Note'
   }],
   theme: {
      type: String,
      enum: ['Neutral', 'CamoGreen', 'BabyBlue', 'Purple', 'RosePink', 'Bright', 'SoftPastels']
   },


   level1: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   level2: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   journal: [{
      type: String
   }],


   birthWeight: {
      type: String,
      required: true
   },
   birthLength: {
      type: String,
      required: true
   },

   birthDate: {
      type: Date,
      required: true
   },
   dischargeDate: Date,
   deathDate: Date,

   createdAt: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Baby', babySchema);
