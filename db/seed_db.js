const faker = require('faker');
const readline = require('readline');
const Promise = require('bluebird');
const db = require('./index.js');

function getEntriesCount() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('How many entries to create?: ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function titleCase(string) {
  let output = string.toLowerCase().split(' ');
  output = output.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return output.join(' ');
}

function generateRandomProduct() {
  const randomProductUrl = faker.internet.url();
  const randomImageUrl = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
  const randomProductName = titleCase(`${faker.commerce.productName()} - Made From ${faker.commerce.productMaterial()} (${titleCase(faker.commerce.color())}) - ${faker.commerce.department()}`);
  const randomIsPrime = Math.round(Math.random());
  const randomPrice = `${faker.commerce.price()}`;

  return [randomProductName, randomProductUrl, randomImageUrl, randomIsPrime, randomPrice];
}

function generateRandomFeedback(entries) {
  const randomFeedbackType = Math.floor((Math.random() * 3) + 1);
  const randomFeebackComments = faker.hacker.phrase();
  const randomProductId = Math.floor((Math.random() * entries) + 1000);
  const randomUser = faker.internet.userName();

  return [randomFeedbackType, randomFeebackComments, randomProductId, randomUser];
}

function seedProducts(entries) {
  const output = [];
  const query = 'INSERT INTO products(name, product_url, image_url, is_prime, price) VALUES($1, $2, $3, $4, $5)';
  for (let i = 0; i < entries; i += 1) {
    const values = generateRandomProduct();
    output.push(db.query(query, values));
  }
  return Promise.all(output);
}

function seedFeedback(entries) {
  const output = [];
  const query = 'INSERT INTO feedback(type_id, comments, prod_id, user_name) VALUES($1, $2, $3, $4)';
  for (let i = 0; i < entries; i += 1) {
    const values = generateRandomFeedback(entries);
    output.push(db.query(query, values));
  }
  return Promise.all(output);
}

function createAndSeedFeedback(entries) {
  const createTableQuery = 'CREATE TABLE feedback(id BIGSERIAL PRIMARY KEY,type_id INTEGER,comments VARCHAR(1000),prod_id INTEGER,user_name VARCHAR(50), FOREIGN KEY (prod_id) REFERENCES products (id));';
  return db.query('DROP TABLE IF EXISTS feedback')
    .then(() => db.query(createTableQuery))
    .then(() => seedFeedback(entries));
}

function createAndSeedProducts(entries) {
  const createTableQuery = 'CREATE TABLE products(id BIGSERIAL PRIMARY KEY,name VARCHAR(200) NOT NULL,product_url VARCHAR(200),image_url VARCHAR(200),is_prime BOOLEAN NOT NULL,price DECIMAL NOT NULL);';

  return db.query('DROP TABLE IF EXISTS products CASCADE')
    .then(() => db.query(createTableQuery))
    .then(() => db.query('ALTER SEQUENCE products_id_seq RESTART WITH 1000'))
    .then(() => seedProducts(entries));
}

getEntriesCount()
  .then((entries) => createAndSeedProducts(entries))
  .then(() => db.query('SELECT * FROM products'))
  .then((results) => createAndSeedFeedback(results.rows.length))
  .finally(() => process.exit())
  .catch((e) => e);
