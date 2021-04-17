var util = {};

//접근권한이 없다고 판단된 경우에 호출, 로그인 페이지로 보냄
util.noPermission = function(req, res){
    req.flash('errors', {login:"You don't have permission"});
    req.logout();
    res.redirect('/login');
}

module.exports = util;