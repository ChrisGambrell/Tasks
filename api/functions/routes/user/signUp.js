const { validationResult } = require('express-validator')
const { db, firebase } = require('../../util/config')

module.exports = (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			code: 'input/invalid-input',
			message: errors.errors[0].msg,
		})
	}

	if (req.body.password != req.body.confirmPassword) {
		return res.status(400).json({
			code: 'input/invalid-input',
			message: 'Passwords must match',
		})
	}

	// check to make sure displayName isn't in use
	db.collection('users')
		.where('displayName', '==', req.body.displayName)
		.get()
		.then((snapshot) => {
			if (!snapshot.empty) {
				return res.status(403).json({
					code: 'auth/displayName-already-taken',
					message: 'Display name chosen is already in use',
				})
			}

			// otherwise, proceed with creating user and document
			firebase
				.auth()
				.createUserWithEmailAndPassword(
					req.body.email,
					req.body.password
				)
				.then((userCreds) => {
					db.collection('users').doc(userCreds.user.uid).set({
						displayName: req.body.displayName,
						email: req.body.email,
						createdAt: new Date().getTime(),
					})

					return userCreds.user.getIdToken()
				})
				.then((idToken) => {
					return res.json({ token: idToken })
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
