const { db } = require('../../util/config')

module.exports = (req, res) => {
	return res.json(req.user)
}
