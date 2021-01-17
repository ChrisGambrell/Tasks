const { admin, db } = require('./config')

module.exports = (req, res, next) => {
	// make sure token is passed as header
	if (
		!req.headers.authorization ||
		req.headers.authorization.trim() === '' ||
		!req.headers.authorization.split('Bearer ')[1]
	) {
		return res.status(400).json({
			code: 'auth/no-token-provided',
			message: 'Make sure to include authorization token',
		})
	}

	let idToken = req.headers.authorization.split('Bearer ')[1]
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			return db.collection('users').doc(decodedToken.uid).get()
		})
		.then((doc) => {
			req.user = {
				uid: doc.id,
				...doc.data(),
			}

			next()
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
}
