const express = require('express')
const functions = require('firebase-functions')
const app = express()

app.get('/', (req, res) => {
	res.json({ hello: 'world!' })
})

exports.api = functions.https.onRequest(app)
