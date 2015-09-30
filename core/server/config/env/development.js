// ENVIRONMENT VARIABLES
module.exports = {
   // you want to get your own mongolab database and credentials from within Heroku
   // if you leave it like this you will be hitting my database :)
   db: 'mongodb://nicu-user:makebaby@ds033317.mongolab.com:33317/nicu-project',
   sessionSecret: 'nicugroupdevF%$#yeah'
};
