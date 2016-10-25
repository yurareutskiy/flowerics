const env = process.env.NODE_ENV || 'development';
const mysql = require('mysql');
const config = require('./config');

if (env === 'production') {
	mysql.createConnection(config.production).connect();
} else {
	mysql.createConnection(config.development).connect();
}
