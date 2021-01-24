const { validationResult } = require('express-validator')
const { db } = require('../../util/config')

module.exports = (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			code: 'input/invalid-input',
			message: errors.errors[0].msg,
		})
	}

	let newTask = {
		uid: req.user.uid,
		body: req.body.body,
		completed: req.body.completed || false,
		createdAt: new Date().getTime(),
	}

	db.collection('tasks')
		.add(newTask)
		.then(() => {
			return res.json(newTask)
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
