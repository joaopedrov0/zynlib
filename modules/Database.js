const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    // database: ''
})

connection.connect()

function ensureDatabase(){
    connection.query('CREATE DATABASE IF NOT EXISTS mdblog')
}

connection.end()