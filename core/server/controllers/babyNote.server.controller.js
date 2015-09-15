//functions for baby notes
var Note = require('../models/babyNote.server.model.js');
var AWS = require('aws-sdk');
var Keys = require('../config/keys.js');


// *********ACCESS KEYS FOR AMAZON S3 AND SAVING IMAGES*************
AWS.config.update({
  accessKeyId: Keys.amazonAccess
  , secretAccessKey: Keys.amazonSecret
  , region: Keys.amazonRegion
});

var s3 = new AWS.S3();


module.exports = {
  createNote: function(req, res) {
    var newNote = new Note(req.body)
    .exec(function(err, note) {
      if (err) return res.status(500).send(err);
      else res.send(note);
    });
  },

  getNotes: function(req, res) {
    Note.find({})
    .populate(baby)
    .populate(creator)
    .exec(function(err, notes) {
      if (err) return res.status(500).send(err);
      else res.send(notes);
    });
  },

  getOneNote: function(req, res) {
    Note.findById(req.params.noteId)
    .populate(baby)
    .populate(creator)
    .exec(function(err, note) {
      if (err) return res.status(500).send(err);
      else res.send(note);
    });
  },

  editNote: function(req, res) {
    //returns updated note
    Note.findByIdAndUpdate(req.params.noteId, req.body, {new: true, upsert: true}, function(err, note) {
      if (err) return res.status(500).send(err);
      else res.send(note);
    });
  },

  saveImage: function(req, res) {
    buf = newBuffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    var bucketName = 'nicuproject/' + req.body.userEmail;
    var params = {
        Bucket: bucketName
        , Key: req.body.imageName
        , Body: buf
        , ContentType: 'image/' + req.body.imageExtension
        , ACL: 'public-read'
    };

    s3.upload(params, function(err, data) {
      console.log(err, data);
      if (err) return res.status(500).send(err);
      res.json(data);
    });
  }
};
