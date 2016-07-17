var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var adminSchema = Schema({
  login:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

var Admin = module.exports = mongoose.model('Admin', adminSchema);
