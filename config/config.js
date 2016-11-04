module.exports = {
  development: {
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "flink_development",
    host: "localhost"
  },
  production: {
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "flink_production",
    host: "localhost"
  }
}
