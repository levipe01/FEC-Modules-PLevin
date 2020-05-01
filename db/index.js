const { Pool } = require('pg');

const pool = new Pool({
  user: 'levipe01',
  host: 'localhost',
  database: 'similar_products',
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
