const {Pool} = require('pg');
const {db, configdb} = require('./config');

const pool = new Pool(configdb);

module.exports = pool;