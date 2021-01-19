const express = require('express')
const functions = require('firebase-functions')
const authenticate = require('./util/authenticate')
const { loginValidation, signUpValidation } = require('./util/inputValidation')
const app = express()

const {
	getMe,
	getUser,
	getUsers,
	loginUser,
	signUpUser,
} = require('./routes/user')
app.post('/login', loginValidation(), loginUser)
app.get('/me', authenticate, getMe)
app.post('/signup', signUpValidation(), signUpUser)
app.get('/user', getUser)
app.get('/user/:uid', getUser)
app.get('/users', getUsers)

exports.api = functions.https.onRequest(app)
