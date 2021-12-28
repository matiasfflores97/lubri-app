const User = require('../schemas/user')

exports.getUsers = async (req, res) => {
    const findUser = await User.find()
    res.send(findUser)
}