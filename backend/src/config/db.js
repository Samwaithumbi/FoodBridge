const mongoose = require('mongoose')

//connect to the database
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the database successfully');
    } catch (error) {
        console.log('Error connecting to the database:', error);
        process.exit(1)
    }
}

module.exports=connectDb