var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var development = require('./env/development');
var production = require('./env/production');

if (env === 'production') {
  mysql.createConnection(production.db).connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
} else {
  mysql.createConnection(development.db).connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
}
