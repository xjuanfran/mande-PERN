const {Pool} = require('pg');
const {configdb} = require('./config');

const pool = new Pool(configdb);

module.exports = pool;