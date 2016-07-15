var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

function priceValidator(val) {
  return val > 0;
}

var priceValidtor = [priceValidator, 'Цена должна быть положительной']

var flowerSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true,
    validate: priceValidator
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

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
    name: flower.name,
    price: flower.price,
    description: flower.description,
    image: flower.image
  };
  var options = { runValidators: true };

  Flower.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeFlower = function(id, callback) {
  var query = {_id: id};
  Flower.remove(query, callback);
}
