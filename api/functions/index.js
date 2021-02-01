const express = require('express')
const functions = require('firebase-functions')
const authenticate = require('./util/authenticate')
const app = express()

const {
	addTask,
	deleteTask,
	getAllTasks,
	getTask,
	getTasks,
	updateTask,
} = require('./routes/tasks')
const {
	addTaskValidation,
	updateTaskValidation,
} = require('./util/validations/taskValidations')
app.get('/', getAllTasks)
app.get('/tasks', authenticate, getTasks)
app.post('/tasks', authenticate, addTaskValidation(), addTask)
app.get('/tasks/:taskId', getTask)
app.delete('/tasks/:taskId', authenticate, deleteTask)
app.patch('/tasks/:taskId', authenticate, updateTaskValidation(), updateTask)

const {
	getMe,
	getUser,
	getUserTasks,
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
app.get('/user/:uid/tasks', getUserTasks)
app.get('/users', getUsers)

exports.api = functions.https.onRequest(app)
