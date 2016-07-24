var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = Schema({
  user: {
    type : Schema.ObjectId,
    ref : 'User'
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'canceled', 'ready'],
    default: 'pending'
  }
}, { timestamps: true });

var Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.createOrder = function(order, callback) {
  Order.create(order, callback);
};

