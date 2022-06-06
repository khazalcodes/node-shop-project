const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete_course',
    password: 'toor'
})

exports.db = pool.promise();