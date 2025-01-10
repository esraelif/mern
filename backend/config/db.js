const mongoose = require('mongoose')
const db = () => {
    mongoose.connect('mongodb+srv://elifesratunca:b97dbOxJfHlgq66X@cluster0.od2m3.mongodb.net/', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,

    }).then(() => {
        console.log("mongoDB connected")
    }).catch((err) => {
        console.log(err)
    })
}
module.exports = db;