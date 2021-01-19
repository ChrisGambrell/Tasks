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

	// make sure display name isn't in use
	db.collection('users')
		.where('displayName', '==', req.body.displayName)
		.get()
		.then((snap) => {
			if (!snap.empty) {
				return res.status(403).json({
					code: 'auth/displayName-already-taken',
					message: 'Display name chosen is already in use',
				})
			}

			return db.collection('users').doc(req.user.uid).update({
				displayName: req.body.displayName,
			})
		})
		.then(() => {
			return db.collection('users').doc(req.user.uid).get()
		})
		.then((doc) => {
			return res.json({ id: doc.id, ...doc.data() })
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
