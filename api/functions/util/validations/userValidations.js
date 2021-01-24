const { body } = require('express-validator')

exports.loginValidation = () => {
	return [
		body('email')
			.notEmpty()
			.withMessage('Email must not be empty')
			.isEmail()
			.withMessage('Email must be a valid email'),
		body('password')
			.notEmpty()
			.withMessage('Password must not be empty')
			.isString()
			.withMessage('Password must be a string'),
	]
}

exports.signUpValidation = () => {
	return [
		body('displayName')
			.notEmpty()
			.withMessage('Display name must not be empty')
			.isString()
			.withMessage('Display name must be a string'),
		body('email')
			.notEmpty()
			.withMessage('Email must not be empty')
			.isEmail()
			.withMessage('Email must be a valid email'),
		body('password')
			.notEmpty()
			.withMessage('Password must not be empty')
			.isString()
			.withMessage('Password must be a string')
			.isLength({ min: 5 })
			.withMessage('Password must have at least 5 characters'),
		body('confirmPassword')
			.notEmpty()
			.withMessage('Confirm password must not be empty')
			.isString()
			.withMessage('Confirm password must be a string'),
	]
}

exports.updateUserValidation = () => {
	return [
		body('displayName')
			.notEmpty()
			.withMessage('Display name most not be empty')
			.isString()
			.withMessage('Display name must be a string'),
	]
}
