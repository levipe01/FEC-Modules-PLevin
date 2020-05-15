const express = require('express');
const db = require('../db/index.js');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('./client/dist'));

app.get('/api/similar_products', (req, res) => {
  db.query('select * from products inner join (select prod_id, AVG(rating) as avg_rating from ratings group by prod_id) as temp on (products.id=temp.prod_id)')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).json(e);
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
      res.status(400).json(e);
    });
});

app.listen(port);
