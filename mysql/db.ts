const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool(config).promise();
export default pool;
