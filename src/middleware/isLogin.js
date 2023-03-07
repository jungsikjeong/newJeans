const passport = require('passport');

module.exports = function isLogin(req, res, next) {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    // passport.jwt token === undefined
    if (info) {
      return res
        .status(401)
        .json([{ msg: 'JsonWebTokenError: invalid signature' }]);
    }

    req.user = user._id;
    next();
  })(req, res, next);
};
