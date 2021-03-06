const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { // the GoogleStrategy has an internal identifier 'google'
    // scope is already defined by google
    scope: ['profile', 'email'] // what we need to get out of the authenicated user, profile => name, lastname ...
}));
// here is the callback coming from google, passport will know that the user is not trying to authenticate, the user
// has given us permission and now it's time to resolve BECAUSE the code is in the path
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.status(200).redirect('/');
})

// here to log user out, passport is in charge
router.get('/logout', (req, res, next) => {
  req.logout(); // logging out
  res.status(200).redirect('/');
})

// getting the user just to verify
router.get('/user', (req, res, next) => {
  res.send(req.user);
})

module.exports = router;

// module.exports = app => {
//   app.get(
//     '/api/auth/google',
//     passport.authenticate('google', { // the GoogleStrategy has an internal identifier 'google'
//       // scope is already defined by google
//         scope: ['profile', 'email'] // what we need to get out of the authenicated user, profile => name, lastname ...
//     })
//   );
//   // here is the callback coming from google, passport will know that the user is not trying to authenticate, the user
//   // has given us permission and now it's time to resolve BECAUSE the code is in the path
//   app.get(
//     '/api/auth/google/callback',
//     passport.authenticate('google')
//   );
//
//   app.get('/api/logout', (req, res) => {
//     req.logout();
//     res.send(req.user);
//   })
//
//   app.get('/api/current_user', (req, res) => {
//     res.send(req.user);
//   })
// }
