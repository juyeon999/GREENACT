// //userTest, db로 구현 필요
// //const users = [{ id:"그린액트", email: "green@gmail.com", password: "123123" }]; db 구현
// const express = require('express');
//
// const router = express.Router();
//
// router.use((req, res, next) => {
//     res.locals.user = null;
//     next();
// });
// const login = (request, response) => {
//   const { username, password } = request.body;
//   const user = users.find(
//       (user) => user.username === username && user.password === password
//   );
//   user !== undefined ? response.status(200) : response.status(400);
//   console.log(JSON.stringify(user));
//   response.json(JSON.stringify(user));
// };
//
// //회원가입
// router.get('/Signup', function(req, res, next) {
//     // res.render("user/signup");//바꾸기
// });
// router.post('/Signup', function (req, res) {
//     // console.log("req", req.body);
//     const users = {
//         "id": req.body.id,
//         "email": req.body.email,
//         "password": req.body.password
//     }
//     const sql = 'INSERT INTO users SET ?';
//     conn.query(sql , users, function (error, results, fields) {
//         if (error) {
//             console.log("error occurred", error);
//             res.send({
//                 "code" : 400,
//                 "failed": "error occurred"
//             })
//         } else {
//             console.log('The solution is: ', results);
//             res.send({
//                 "code": 200,
//                 "success": "user registered successfully"
//             });
//         }
//     });
// });
//
// //로그인
// router.get('/Login', function(req, res, next) {
//     res.render('user/login.ejs');//바꾸기
// });
//
// router.post('/Login', function (req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
//     const sql = 'SELECT password FROM users WHERE email = ?';
//     conn.query(sql, [email],
//         function( error, results, fields) {
//             if (error) {
//                 // console.log("error occurred", error);
//                 res.send({
//                     "code": 400,
//                     "failed": "error occurred"
//                 })
//             } else {
//                 console.log('The solution is: ', results);
//                 if(results.length > 0) {
//                     if(results[0].password === password) {
//                         res.send({
//                             "code": 200,
//                             "success": "login successfully"
//                         });
//                     } else {
//                         res.send({
//                             "code": 204,
//                             "success": "email and password does not match"
//                         });
//                     }
//                 } else {
//                     res.send({
//                         "code":204,
//                         "success": "Email does not exists"
//                     });
//                 }
//             }
//         })
// });
//
// module.exports = router;