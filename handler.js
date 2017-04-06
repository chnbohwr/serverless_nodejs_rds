'use strict';
var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')();
const connection = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
}
var db = pgp(connection);

module.exports.getUser = (event, context, callback) => {
  db.any('SELECT * FROM user')
    .then((data) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    }).catch((error) => {
      callback(error);
    }).finally(() => {
      pgp.end();
    });
};
