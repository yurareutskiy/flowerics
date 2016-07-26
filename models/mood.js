var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs');

var moodSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  bouquet: {
    type : Schema.ObjectId,
    ref : 'Bouquet'
  }
}, { timestamps: true });

var Mood = module.exports = mongoose.model('Mood', moodSchema);

module.exports.getMoods = function(callback, limit) {
  Mood.find(callback).limit(limit);
}

module.exports.getMoodById = function(id, callback) {
  Mood.findById(id, callback);
}

module.exports.createMood = function(mood, callback) {
  Mood.create(mood, callback);
}

module.exports.updateMood = function(id, mood, options, callback) {
  var query = {_id: id};
  var update = {
    name: mood.name
  };

  Mood.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeMood = function(id, callback) {
  var query = {_id: id};
  Mood.remove(query, callback);
}

