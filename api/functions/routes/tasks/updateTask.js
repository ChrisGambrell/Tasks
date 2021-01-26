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

	// make sure only the owner can edit
	db.collection('tasks')
		.doc(req.params.taskId)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({
					code: 'task/not-found',
					message: 'Cannot find task with that ID',
				})
			} else if (doc.data().uid != req.user.uid) {
				return res.status(403).json({
					code: 'auth/not-authorized',
					message: 'You cannot edit a task you are not the owner of',
				})
			}

			var updatedTask = {
				id: doc.id,
				...doc.data(),
				body: req.body.body || doc.data().body,
				completed:
					req.body.completed != undefined
						? req.body.completed
						: doc.data().completed,
			}

			db.collection('tasks')
				.doc(req.params.taskId)
				.update(updatedTask)
				.then(() => {
					return res.json(updatedTask)
				})
				.catch((error) => {
					console.error(error)
					return res.status(500).json(error)
				})
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
