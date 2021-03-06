var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '000930',
    database : 'sep_collection'
});

connection.connect();


connection.query('SELECT * From general_trash', function(err,results,fields) {
    if(err) {
        console.log(err);
    }
    console.log(results);
});

connection.end();
