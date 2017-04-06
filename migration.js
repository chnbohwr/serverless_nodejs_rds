const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
  }
});

module.exports.migration = (event, context, callback) => {
  knex.migrate.currentVersion().then((v) => {
    console.log('migration version', v);
    knex.migrate.latest().then((wq) => {
      console.log('migration success', wq);
      callback(null, {
        statusCode: 200,
        body: 'database migration success'
      });
    }).then((e) => {
      callback(e);
    }).finally(()=>{
      knex.destroy();
    });
  });
}
