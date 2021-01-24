const { db } = require('../../util/config')

module.exports = (req, res) => {
	db.collection('tasks')
		.where('uid', '==', req.user.uid)
		.orderBy('createdAt')
		.get()
		.then((snap) => {
			var tasks = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
			return res.json(tasks)
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
