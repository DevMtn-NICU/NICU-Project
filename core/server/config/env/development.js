// ENVIRONMENT VARIABLES
module.exports = {
    // you want to get your own mongolab database and credentials from within Heroku
    // if you leave it like this you will be hitting my database :)
    db: 'mongodb://<dbuser>:<dbpassword>@ds041663.mongolab.com:41663/nicu-project',
    sessionSecret: 'nicuwebprojectdevf#$%yeah'
};
