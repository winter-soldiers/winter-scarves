const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'scarf'
});

// Remove any automatic connection logic here
// Let the seed file handle the connection

module.exports = client;