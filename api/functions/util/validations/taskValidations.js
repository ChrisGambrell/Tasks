const { body } = require('express-validator')

exports.addTaskValidation = () => {
	return [
		body('body')
			.notEmpty()
			.withMessage('Body must not be empty')
			.isString()
			.withMessage('Body must be a string'),
		body('completed')
			.optional()
			.isBoolean()
			.withMessage('Completed must be a boolean'),
	]
}
