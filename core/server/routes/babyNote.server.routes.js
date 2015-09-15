//routes for baby notes
var babyNoteCtrl = require('../controllers/babyNote.server.controller'),
    passport = require('passport');

module.exports = function(app, passport) {
  //create note
  app.post('/babyNote', babyNoteCtrl.createNote);
  //get all notes
  app.get('/babyNote', passport.authenticate('local'), babyNoteCtrl.getNotes);
  //get one note
  app.get('/babyNote/:noteId', passport.authenticate('local'), babyNoteCtrl.getOneNote);
  //edit note
  app.post('/babyNote/:noteId', passport.authenticate('local'), babyNoteCtrl.editNote);
};
