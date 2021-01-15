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

exports.signUpValidation = (req) => {
	return [
		body('displayName')
			.notEmpty()
			.withMessage('Display name must not be empty'),
		body('email')
			.notEmpty()
			.withMessage('Email must not be empty')
			.isEmail()
			.withMessage('Email must be a valid email'),
		body('password')
			.isLength({ min: 5 })
			.withMessage('Password must have at least 5 characters'),
		body('confirmPassword')
			.notEmpty()
			.withMessage('Confirm password must not be empty'),
	]
}
