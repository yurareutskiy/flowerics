var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs');

var bouquetSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  prescription: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    index: true,
    min: 0
  },
  flower: [{
    type: Schema.Types.ObjectId,
    ref: 'Flower'
  }],
  color: {
    type: String,
    required: true
  },
  color_icon: {
    type: String,
    trim: true
  }
}, { timestamps: true });

var Bouquet = module.exports = mongoose.model('Bouquet', bouquetSchema);

module.exports.getBouquets = function(callback, limit) {
  Bouquet.find(callback).limit(limit);
};

module.exports.getBouquetById = function(id, callback) {
  Bouquet.findById(id, callback);
};

module.exports.createBouquet = function(bouquet, callback) {
  Bouquet.create(bouquet, callback);
};

module.exports.updateBouquet = function(id, bouquet, options, callback) {
  var query = {_id: id};
  var update = {
    name: bouquet.name,
    price: bouquet.price,
    description: bouquet.description,
    prescription: bouquet.prescription,
    color: bouquet.color,
    image: bouquet.image,
    color_icon: bouquet.color_icon
  };

  Bouquet.findOneAndUpdate(query, update, options, callback);
};

bouquetSchema.post('remove', function(bouquet) {
  fs.unlink(__dirname +'/../public/uploads/' + bouquet.image);
  fs.unlink(__dirname +'/../public/uploads/' + bouquet.color_image);
});
