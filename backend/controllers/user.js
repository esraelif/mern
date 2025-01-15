const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jwt");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.status(500).json({ message: "Email already exists" })
    }
    const passwordHash = await bcrypt.hash(password, 10);
    if (password.length < 6) {
        return res.status(500).json({ message: "Password should be at least 6 characters long" })
    }
    const newUser = await User.create({ name, email, password: passwordHash });
    const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", { expiresIn: "1h" })
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("token", token, cookieOptions).json({
        newUser,
        token
    })

}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        return res.status(401).json({ message: "Incorrect password" })
    }
    const token = await jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" })
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(200).cookie("token", token, cookieOptions).json({
        user,
        token
    })
}


const logOut = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    res.status(200).cookie("token", null, cookieOptions).json({
        message: "Logged out successfully"
    })



}

const forgotPassword = async (req, res) => {

}
const resetPassword = async (req, res, next) => {

}

module.exports = { register, login, forgotPassword, resetPassword, logOut }