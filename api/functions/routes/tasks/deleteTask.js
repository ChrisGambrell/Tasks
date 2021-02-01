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
			} else if (doc.data().uid != req.user.uid) {
				return res.status(403).json({
					code: 'auth/not-authorized',
					message: 'You cannot edit a task you are not the owner of',
				})
			}

			doc.ref
				.delete()
				.then(() => {
					return res.json({ id: doc.id, ...doc.data() })
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
