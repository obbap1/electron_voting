var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let dbUrl = 'mongodb://paschal:paschal112233@ds014648.mlab.com:14648/elendu';
let db = mongoose.connection;
let Candidate = require('../models/candidate');

mongoose.connect(dbUrl, function (err) {
    if (err) {
        return console.log('there was a problem' + err); 
     }
    console.log('connected!');
  })

router.get('/getCandidate/:id',(req,res)=>{
    Candidate.find({ "_id":req.params.id})
        .then((data)=>{
            console.log(data);
            res.json(data);
        })
        .catch(e=>{return e});
})


router.put('/getCandidate/:id',(req,res)=>{
    Candidate.findOneAndUpdate({'_id':req.params.id}, {$set:{votes:req.body.votes}} ,{new:true},(err,votes)=>{
        if(err) throw err;
        res.json(votes);
    })
})


module.exports = router;