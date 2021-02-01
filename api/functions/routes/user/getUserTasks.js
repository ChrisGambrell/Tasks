const { db } = require('../../util/config')

module.exports = (req, res) => {
	db.collection('users')
		.doc(req.params.uid)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({
					code: 'user/not-found',
					message: 'Cannot find user with that ID',
				})
			}

			db.collection('tasks')
				.where('uid', '==', req.params.uid)
				.orderBy('createdAt')
				.get()
				.then((snap) => {
					var tasks = snap.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					return res.json(tasks)
				})
				.catch((error) => {
					console.error(error)
					return res.status(500).json(error)
				})
		})
}
