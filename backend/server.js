const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes')
const profileRoutes = require('../backend/src/routes/profile.routes')
const donationsRoutes = require('./src/routes/donations.routes')
const requestsRoutes = require("../backend/src/routes/requests.routes")
const adminRoutes = require('../backend/src/routes/admin.routes')
const cors = require("cors")
const errorHandler = require('./src/middleware/errorHandler')
dotenv.config()

const app = express()
const port = process.env.PORT 


app.use(cors( {
 origin: "http://localhost:5173", 
credentials: true,}))

app.use(express.json())
app.use(errorHandler)
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/donations', donationsRoutes)
app.use('/api/requests', requestsRoutes)
app.use('/api/admin', adminRoutes)

// Connect to the database and start the server
connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
})

