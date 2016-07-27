var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var flowerSchema = Schema({
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

var Flower = module.exports = mongoose.model('Flower', flowerSchema);

module.exports.getFlowers = function(callback, limit) {
  Flower.find(callback).limit(limit);
}

module.exports.getFlowerById = function(id, callback) {
  Flower.findById(id, callback);
}

module.exports.createFlower = function(flower, callback) {
  Flower.create(flower, callback);
}

module.exports.updateFlower = function(id, flower, options, callback) {
  var query = {_id: id};
  var update = {
    name: flower.name
  };

  Flower.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeFlower = function(id, callback) {
  var query = {_id: id};
  Flower.remove(query, callback);
}

