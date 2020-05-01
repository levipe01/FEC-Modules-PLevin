const express = require('express');
const db = require('../db/index.js');

const app = express();
const port = 3000;

app.use(express.json());


app.get('/api/similar_products', (req, res) => {
  db.query('SELECT * FROM products')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(200).json(e);
    });
});

app.post('/api/similar_products/feedback', (req, res) => {
  const queryString = 'INSERT INTO feedback (type_id, comments, prod_id, user_name) VALUES ($1, $2, $3, $4)';
  const options = [req.body.type_id, req.body.comments, req.body.prod_id, req.body.user_name];
  db.query(queryString, options)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(200).json(e);
    });
});

app.listen(port);
