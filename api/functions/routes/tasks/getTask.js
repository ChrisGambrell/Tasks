const { db } = require('../../util/config')

module.exports = (req, res) => {
	db.collection('tasks')
		.doc(req.params.taskId)
		.get()
		.then((doc) => {
			return res.json({ id: doc.id, ...doc.data() })
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
