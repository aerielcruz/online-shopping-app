import passport from 'passport'
import bcrypt from 'bcryptjs'
import LocalStrategy from 'passport-local'
import User from '../models/User.js'

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passReqToCallback: true
		},
		(req, username, password, done) => {
			const email = username.toLowerCase()
			console.log(`Signin attempt to: ${email}`)
			User.findOne({ email }).select('+password')
				.then(async (user) => {
					if (user && (await bcrypt.compare(password, user.password))) done(null, user)
					else done(null, false, { message: 'Email or password is incorrect' })
				})
		}
	)
)

export { passport }