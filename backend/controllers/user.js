const User = require("../models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

const register = async (req, res) => {
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 130,
        crop: "scale"
    })
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.status(500).json({ message: "Email already exists" })
    }
    const passwordHash = await bcrypt.hash(password, 10);
    if (password.length < 6) {
        return res.status(500).json({ message: "Password should be at least 6 characters long" })
    }
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        avatar: {
            public_id: avatar.public_id,
            url: avatar.secure_url,
        }
    });
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
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ message: "Invalid email" })
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const passwordUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`
    const message = `Password reset token is ${passwordUrl}`
    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: 'elifesratunca@gmail.com',
                pass: '2008.Kaan'
            },
            secure: true
        });

        const mailData = {
            from: 'elifesratunca@gmail.com',
            to: req.body.email,
            subject: 'Şifre sıfırlama',
            text: message,
        }
        await transporter.sendMail(mailData);
        res.status(200).json({ message: "Reset password link sent to your email" });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ message: error.message });
    }

}
const resetPassword = async (req, res, next) => {
    const resetPassword = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ resetPasswordToken: resetPassword, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) {
        return res.status(400).json({ message: "Token is invalid or expired" });
    }
    user.password = request.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    const token = jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" })
    res.status(200).cookie("token", token, cookieOptions).json({
        user, token
    });

}
const userDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        user
    })
}


module.exports = { register, login, forgotPassword, resetPassword, logOut, userDetails }