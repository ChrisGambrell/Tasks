const express = require('express')
const { validationResult } = require('express-validator')
const functions = require('firebase-functions')
const { firebase } = require('./util/config')
const { loginValidation } = require('./util/inputValidation')
const app = express()

app.post('/login', loginValidation(), (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			code: 'input/invalid-input',
			message: errors.errors[0].msg,
		})
	}

	firebase
		.auth()
		.signInWithEmailAndPassword(req.body.email, req.body.password)
		.then((userCreds) => {
			return userCreds.user.getIdToken()
		})
		.then((idToken) => {
			return res.status.json({ token: idToken })
		})
		.catch((error) => {
			console.error(error)
			return res.status(500).json(error)
		})
})

exports.api = functions.https.onRequest(app)
