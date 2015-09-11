//routes for baby notes
var babyNoteCtrl = require('../controllers/babyNote.server.controller'),
    passport = require('passport');

module.exports = function(app, passport) {
  //get all notes
  app.post('/babyNote', passport.authenticate('local'), babyNoteCtrl.createNote);
  //
  app.get('/babyNote', passport.authenticate('local'), babyNoteCtrl.getNotes);
  app.get('/babyNote/:noteId', passport.authenticate('local'), babyNoteCtrl.getOneNote);
  app.post('/babyNote/:noteId', passport.authenticate('local'), babyNoteCtrl.editNote);
};
