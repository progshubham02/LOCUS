var mysql = require('mysql');
const util = require("util");

const pool=mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"locus",
    connectionLimit: 100,
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;

