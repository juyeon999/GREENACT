const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.use((req, res, next)=>{
      res.locals.user = req.user;
      next();
    }
)

// router.get('/join', (req, res) => {
//   res.render('join', { title: '회원가입' });
// });

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { nick, email, password, interest } = req.body;
  try {
    const exUser = await User.findOne({ where: { nick } });
    if (exUser) { // 닉네임 중복 시
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    let result = await User.create({
      nick,
      email,
      password: hash,
      interest,
    });
    console.log(JSON.stringify(result));
    return res.json(JSON.stringify(result)); //가입 완료하면 첫화면으로 돌아감 res.redirect('/login'); res.json(JSON.stringify(User));
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get('/login', (req, res, next) => {
//   res.render('login', { title: '로그인' });
// });

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`j/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log(JSON.stringify(user));
      return res.json(JSON.stringify(user)); // res.render("login");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(); //req.user 객체 제거
  req.session.destroy(); //req.session 객체 제거
  res.redirect('/');//메인 페이지
});

// router.get('/kakao', passport.authenticate('kakao'));
//
// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('/');
// });

module.exports = router;
