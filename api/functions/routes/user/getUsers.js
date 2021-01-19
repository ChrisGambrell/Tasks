const { db } = require('../../util/config')

module.exports = (req, res) => {
	// fetch user from uid
	db.collection('users')
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
