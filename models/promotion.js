var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs');

var promotionSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type : String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true });

var Promotion = module.exports = mongoose.model('Promotion', promotionSchema);

module.exports.getPromotions = function(callback, limit) {
  Promotion.find(callback).limit(limit);
}

module.exports.getPromotionById = function(id, callback) {
  Promotion.findById(id, callback);
}

module.exports.createPromotion = function(promotion, callback) {
  Promotion.create(promotion, callback);
}

module.exports.updatePromotion = function(id, promotion, options, callback) {
  var query = {_id: id};
  var update = {
    name: promotion.name
  };

  Promotion.findOneAndUpdate(query, update, options, callback);
}

module.exports.removePromotion = function(id, callback) {
  var query = {_id: id};
  Promotion.remove(query, callback);
}

promotionSchema.post('remove', function(promotion) {
  fs.unlink(__dirname +'/../public/uploads/' + promotion.image);
});
