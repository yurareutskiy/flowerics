var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = Schema({
  facebook : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  vkotakte : {
    vkontakteId  : String,
    token        : String,
    email        : String,
    name         : String
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
    require: true
  },
  points: {
    type: Number,
    default: 0,
    required: true
  },
  orders : [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  payments : [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }]
}, { timestamps: true });

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};
