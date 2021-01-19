const { db } = require('../../util/config')

module.exports = (req, res) => {
	if (req.params.uid) {
		// fetch user from uid
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

				return res.json({
					id: doc.id,
					...doc.data(),
				})
			})
			.catch((error) => {
				console.error(error)
				return res.status(500).json(error)
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
			.then((snap) => {
				var users = []
				users = snap.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))

				return res.json(users)
			})
			.catch((error) => {
				console.error(error)
				return res.status(500).json(error)
			})
	} else {
		return res.status(404).json({
			code: 'general/function-not-found',
			message: 'Something went wrong',
		})
	}
}
