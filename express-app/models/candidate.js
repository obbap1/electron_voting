const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dbUrl = 'mongodb://paschal:paschal112233@ds014648.mlab.com:14648/elendu';



mongoose.connect(dbUrl, function (err) {
  if (err) {
      return console.log('there was a problem' + err); 
   }
  console.log('connected!');
})

let db = mongoose.connection;

db.on('error', function () {
    console.log('error');
  });

let CandidateSchema = new Schema({
    firstName: {
      type:String
    },
    lastName: {
      type:String
    },
    state:{
      type:String
    },
    lga: {
      type:String
    },
    sex:{
      type:String
    },
    religion: {
      type:String
    },
    nationality: {
      type:String
    },
    age: {
      type:Number
    },
    reg: {
      type:Number
    },
    party:{
        type:String
    },
    position:{
        type:String
    },
    votes:{
        type: Number
    }
});

let Candidate = module.exports = mongoose.model('candidate',CandidateSchema);