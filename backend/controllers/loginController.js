const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../schemas/user');

exports.createUser = async (req, res) => {
    let body = req.body;
    let { name, email, password, role } = body

    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    })

    newUser.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })
}

exports.getUser = async (req, res, next) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: err
            })
        }
        if(!userDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User or Password wrong."
                }
            })
        }
        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User or Password wrong"
                }
            })
        }

        let token = jwt.sign({
            user: userDB,
        }, 'secret', {
            expiresIn: '48h'
        })

        res.header('auth-token', token).json({
            ok: true,
            user: userDB,
            token
        })
    })
}