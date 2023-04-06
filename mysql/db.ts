const mysql = require('mysql2');

const config ={
  host:'localhost',
  port:'3306',
  user:'root',
  password:'root',
  database:'blog',
  connectionLimit: 1
}

const pool = mysql.createPool(config).promise();
export default pool;
