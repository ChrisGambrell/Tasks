const express = require('express')
const functions = require('firebase-functions')
const authenticate = require('./util/authenticate')
const app = express()

const { addTask, getTasks } = require('./routes/tasks')
const { addTaskValidation } = require('./util/validations/taskValidations')
app.get('/tasks', authenticate, getTasks)
app.post('/tasks', authenticate, addTaskValidation(), addTask)

const {
	getMe,
	getUser,
	getUsers,
	loginUser,
	signUpUser,
	updateUser,
} = require('./routes/user')
const {
	loginValidation,
	signUpValidation,
	updateUserValidation,
} = require('./util/validations/userValidations')
app.post('/login', loginValidation(), loginUser)
app.get('/me', authenticate, getMe)
app.post('/signup', signUpValidation(), signUpUser)
app.get('/user', getUser)
app.patch('/user', authenticate, updateUserValidation(), updateUser)
app.get('/user/:uid', getUser)
app.get('/users', getUsers)

exports.api = functions.https.onRequest(app)
