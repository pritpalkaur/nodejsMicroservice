const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PostgreSQL 17',
  password: 'password',
  port: 5432,
});
module.exports = pool;
