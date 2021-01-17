const express = require('express')
const functions = require('firebase-functions')
const authenticate = require('./util/authenticate')
const { loginValidation, signUpValidation } = require('./util/inputValidation')
const app = express()

const { getUser, loginUser, signUpUser } = require('./routes/user')
app.post('/login', loginValidation(), loginUser)
app.post('/signup', signUpValidation(), signUpUser)
app.get('/user', authenticate, getUser)
// app.get('/user/:uid', getUser)   // not ready yet

exports.api = functions.https.onRequest(app)
