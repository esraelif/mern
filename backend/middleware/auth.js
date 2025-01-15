const User = require("../models/user.js");
const jwt = require('jsonwebtoken');
const authenticationMid = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(500).json({ message: "Please Login" })
    }
    const decodedData = jwt.verify(token, "SECRETTOKEN");
    if (!decodedData) {
        return res.status(500).json({ message: "Not authenticated" })
    }
    req.user = await User.findById(decodedData.id)
    next();


}

const roleChecked = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next();
    }
}




module.exports = { authenticationMid, roleChecked }