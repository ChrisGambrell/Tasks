const { db } = require('../../util/config')

module.exports = (req, res) => {
	db.collection('tasks')
		.doc(req.params.taskId)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({
					code: 'task/not-found',
					message: 'Cannot find task with that ID',
				})
			}

			return res.json({ id: doc.id, ...doc.data() })
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
