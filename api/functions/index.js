const express = require('express')

const functions = require('firebase-functions')

const { loginValidation, signUpValidation } = require('./util/inputValidation')
const app = express()

const { loginUser, signUpUser } = require('./routes/user')
app.post('/login', loginValidation(), loginUser)
app.post('/signup', signUpValidation(), signUpUser)

exports.api = functions.https.onRequest(app)
