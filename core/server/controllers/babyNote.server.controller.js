//functions for baby notes
var Note = require('../models/babyNote.server.model.js');

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
  }
};
