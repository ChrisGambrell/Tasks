module.exports = (req, res) => {
	if (req.params.uid) {
		// fetch user from uid
		return res.status(404).json({
			code: 'general: todo',
			message: 'This function is not yet completed',
		})
	} else {
		return res.json(req.user)
	}
}
