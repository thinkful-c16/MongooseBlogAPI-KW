'use strict';

//need to export the url
//path($PATH) is a variable that lives in your terminal
//process.env (node process and environment variables); will be what WE pass into OR the db postgres
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost/blog-app';

//db config object that we need to export and pass to knex;  
exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  pool: { min: 0, max: 3}, //elephantsql workaround
  debug: true //show or hide debugging; on production, set to FALSE OR remove!
};


exports.PORT = process.env.PORT || 8080; 