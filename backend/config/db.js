const mongoose = require('mongoose');
const mongouri = "mongodb+srv://ecommerce:ecommerce@cluster0.szudu.mongodb.net/ecommerce?retryWrites=true&w=majority"


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongouri);

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log("Connection error to mongoose: ", err);
    }
}

module.exports = connectDB;