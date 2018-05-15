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

let PartySchema = new Schema({
    party: {
      type:String
    },
    shortparty: {
      type:String
    },
    lga:{
      type:String
    },
    senator: {
      type:String
    }
});

let Party = module.exports = mongoose.model('party',PartySchema);

