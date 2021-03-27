// var mysql = require('mysql');
// var connection = {
//     host : 'localhost',
//     user : 'root',
//     password : '1111',//     password : '000930', database : 'sep_collection'
//     database : 'nodedb'
// }
//
// module.exports = {
//     //DB와 서버간의 연결 객체를 반환하는 'init()' 함수
//     init: function () {
//         return mysql.createConnection(connection);
//     },
//     //데이터 교환을 위해 연결을 시키는 'connect()' 함수
//     connect: function(conn) {
//         conn.connect(function(err) {
//             if(err) console.error('mysql connection error : ' + err);
//             else console.log('mysql is connected successfully!');
//         });
//         conn.query('SELECT * From general_trash', function(err,results,fields) {
//             if(err) {
//                 console.log(err);
//             }
//             console.log(results);
//         });
//     }
// }

// connection.connect();
//
// connection.query('SELECT * From general_trash', function(err,results,fields) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(results);
// });
// connection.end();