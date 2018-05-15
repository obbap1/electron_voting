var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let mongo = require('mongodb');
let dbUrl = 'mongodb://paschal:paschal112233@ds014648.mlab.com:14648/elendu';
let db = mongoose.connection;
let Voter = require('../models/voter');
let Candidate = require('../models/candidate');
let Party = require('../models/party');
let apicontrollers = require('../controllers/apicontrollers');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout,process.stderr);

mongoose.connect(dbUrl, function (err) {
  if (err) {
      return console.log('there was a problem' + err); 
   }
  myConsole.log('connected!');
})
/* GET users listing. */
router.get('/home', function(req, res, next) {
  res.render('users')
});

router.post('/home', function(req, res, next) {
  
  let email = req.body.email;
  let password = req.body.password;
  
  req.checkBody('email','its not equal to admin').equals('admin@yahoo.com')
  req.checkBody('password','its not equal to admin').equals('admin')

  let errors = req.validationErrors();
  if(errors){
    res.render('index')
  }else{
    res.redirect('/users/home');
    res.location('/users/home');
  }


});

router.get('/voters', function(req, res, next) {
  res.render('voters')
});

router.post('/voters', function(req, res, next) {

    var voter = new Voter({ 
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      state: req.body.state,
      lga: req.body.lga,
      sex: req.body.sex,
      religion: req.body.religion,
      nationality: req.body.nationality,
      age: req.body.age,
      reg: req.body.reg,
      ifvoted:req.body.ifvoted
     });
    voter.save(function (error, data) {
      if (error) {
        console.log(error);
      } 
      myConsole.log('data',data);
      res.location('/users/home');
      res.redirect('/users/home');
    });
  });

router.get('/candidate', function(req, res, next) {
  Party.find({},{},(err,parties)=>{
    if(err) throw err;
    res.render('candidate',{
      'parties':parties
    });
  })
  
});

router.post('/candidate', function(req, res, next) {
      var candidate = new Candidate({ 
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        state: req.body.state,
        lga: req.body.lga,
        sex: req.body.sex,
        religion: req.body.religion,
        nationality: req.body.nationality,
        age: req.body.age,
        reg: req.body.reg,
        party:req.body.party,
        votes:0
        });
      candidate.save(function (error, data) {
        if (error) {
          console.log(error);
        } 
        console.log('data',data);
        
        res.location('/users/home');
        res.redirect('/users/home');
      });
    });

router.get('/party', function(req, res, next) {
  res.render('party')
});

router.post('/party', function(req, res, next) {
  
    var party = new Party({ 
      party: req.body.party,
      shortparty: req.body.shortparty,
      lga: req.body.lga,
      senator: req.body.senator,
      
    });
    party.save(function (error, data) {
      if (error) {
        console.log(error);
      } 
      console.log('data',data);
      
      res.location('/users/home');
      res.redirect('/users/home');
    });
  });
  router.get('/election', function(req, res, next) {
    Candidate.find({},{},(err,candidates)=>{
      if(err) throw err;
      res.render('election',{
        'candidates':candidates
      });
    })
  });
  
  router.get('/vote', function(req, res, next) {
    Candidate.find({},{},(err,candidates)=>{
      if(err) throw err;
      res.render('vote',{
        'candidates':candidates
      });
    })
  });
  router.get('/logout', function(req, res, next) {
    res.render('index')
  });
  
  
module.exports = router;
