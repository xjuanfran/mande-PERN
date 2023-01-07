const {Pool} = require('pg');
const pool = new Pool({
    user : "postgres",
    password : "Univalle1616*",
    host : "localhost",
    port : 5432,
    database : "mande"
});

module.exports = pool;