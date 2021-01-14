const config = {
	apiKey: 'AIzaSyB6np5L86y2vx-5-KoIf5qyYvbQ3BgBqzY',
	authDomain: 'tasks-cb39b.firebaseapp.com',
	databaseURL: 'https://tasks-cb39b-default-rtdb.firebaseio.com',
	projectId: 'tasks-cb39b',
	storageBucket: 'tasks-cb39b.appspot.com',
	messagingSenderId: '501431243163',
	appId: '1:501431243163:web:256489c280f6ddfaddd13e',
	measurementId: 'G-1MX8CFLDN4',
}

const firebase = require('firebase')
firebase.default.initializeApp(config)

exports.firebase = firebase.default
