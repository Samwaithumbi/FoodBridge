const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes')
const donationsRoutes = require('./src/routes/donations.routes')
const requestsRoutes = require("../backend/src/routes/requests.routes")
const cors = require("cors")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001


app.use(cors( {
 origin: "http://localhost:5173", // your React dev server
credentials: true,}))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/donations', donationsRoutes)
app.use('/api/donations', requestsRoutes)




// Connect to the database and start the server
connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
})

