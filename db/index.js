const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'database',
  database: 'similar_products',
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
