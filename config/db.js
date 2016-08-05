var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var development = require('./env/development');
var production = require('./env/production');

if (env === 'production') {
  mongoose.connect(production.db);
} else {
  mongoose.connect(development.db);
}
