const express = require('express');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

// router.use((req, res, next) => {
//   res.locals.user = null;
//   next();
// });

router.get('/', (req, res, next) => {
  // res.render('/main', { title: 'NodeBird' });
  res.send("Server Response Success");
});

module.exports = router;
