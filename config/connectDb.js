
import mongoose from 'mongoose'
import colors from 'colors'
const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`server Running On ${conn.connection.host}`.bgCyan.white);
    }catch(error){
        console.log(`${error}`.bgRed)
    }
};
export default connectDb;


// const mongoose = require("mongoose");

// const connectDb = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//     } catch (error) {
//         console.error(`Error: ${error.message}`.red.underline.bold);
//         process.exit(1); // Stop the server if the database doesn't connect
//     }
// };

// module.exports = connectDb;
