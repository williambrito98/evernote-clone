const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const withAuth = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: no token provided' })
    }

    verify(token, process.env.JWT_TOKEN, (err, decode) => {
        if (err)
            return res.status(401).json({ error: 'Unauthorized: token invalid' })
        req.email = decode.email
        User.findOne({ email: decode.email }).then(user => {
            req.user = user
            return next()
        }).catch(e => {
            return res.status(401).json({ error: e })
        })
    })
}


module.exports = withAuth