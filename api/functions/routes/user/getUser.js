const { db } = require('../../util/config')

module.exports = (req, res) => {
	if (req.params.uid) {
		// fetch user from uid
		return res.status(404).json({
			code: 'general: todo',
			message: 'This function is not yet completed',
		})
	} else if (req.query.displayName) {
		db.collection('users')
			.where('displayName', '>=', req.query.displayName)
			.where(
				'displayName',
				'<',
				String.fromCharCode(req.query.displayName.charCodeAt(0) + 1)
			)
			.get()
			.then((snapshot) => {
				var users = []
				users = snapshot.docs.map((document) => ({
					id: document.id,
					...document.data(),
				}))

				return res.json(users)
			})
			.catch((error) => {
				console.error(error)
				return res.status(500).json(error)
			})
	} else {
		return res.json(req.user)
	}
}
