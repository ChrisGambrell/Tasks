const { body } = require('express-validator')

exports.loginValidation = () => {
	return [
		body('email')
			.notEmpty()
			.withMessage('Email must not be empty')
			.isEmail()
			.withMessage('Email must be a valid email'),
		body('password').notEmpty().withMessage('Password must not be empty'),
	]
}
