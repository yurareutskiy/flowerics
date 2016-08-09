var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = Schema({
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'canceled', 'ready'],
    default: 'pending'
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type : Schema.ObjectId,
    ref : 'User'
  }
}, { timestamps: true });

var Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.createOrder = function(order, callback) {
  Order.create(order, callback);
};

