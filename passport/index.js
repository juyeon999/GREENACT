const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

module.exports = () => {
//로그인 시 실행 // serializeUser는 사용자 정보 객체를 세션에 아이디로 저장
  passport.serializeUser((user, done) => {// 로그인 시 실행, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드
    done(null, user.nick);// 로그인 시 사용자 데이터를 세션에 저장, 정보를 모두 저장한다면 세션의 용량이 커지므로 닉네임만 저장
  });

//매 요청 시 실행 // deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다.
  passport.deserializeUser((nick, done) => {
    User.findOne({ where: { nick } }) // 조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();

};
