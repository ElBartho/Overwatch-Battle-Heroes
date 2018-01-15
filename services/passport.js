const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, cb) => {
	cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
	User.findById(id).then(user => {
		cb(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, cb) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				return cb(null, existingUser);
			}

			const user = await new User({ googleId: profile.id }).save();
			cb(null, user);
		}
	)
);
