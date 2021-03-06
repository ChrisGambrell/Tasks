const { db } = require('../../util/config')

module.exports = (req, res) => {
	db.collection('users')
		.orderBy('displayName')
		.get()
		.then((snap) => {
			var users = []
			users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

			return res.json(users)
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
