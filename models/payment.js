var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    tko_api = require('tko-express');

var paymentSchema = Schema({
  _creator : { type: Number, ref: 'User' },
  paid: {
    type: Boolean,
    default: false
  },
  transaction_id: {
    type: Number,
    uniq: true
  }
  amount
  payment_card_id
}, { timestamps: true });

var Payment = module.exports = mongoose.model('Payment', paymentSchema);

module.exports.getPayments = function(payment, callback) {
  Payment.create(payment, callback);
};


var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": "visa",
                "number": "4417119669820331",
                "expire_month": "11",
                "expire_year": "2018",
                "cvv2": "874",
                "first_name": "Joe",
                "last_name": "Shopper",
                "billing_address": {
                    "line1": "52 N Main ST",
                    "city": "Johnstown",
                    "state": "OH",
                    "postal_code": "43210",
                    "country_code": "US"
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": "7",
            "currency": "USD",
            "details": {
                "subtotal": "5",
                "tax": "1",
                "shipping": "1"
            }
        },
        "description": "This is the payment transaction description."
    }]
};

paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
    if (err) {
        console.log(err);
        throw err;
    }

    if (res) {
        console.log("Create Payment Response");
        console.log(res);
    }
});
