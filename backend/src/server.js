const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('../src/config/db')
const authRoutes = require('../src/routes/auth.routes')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use('/', authRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// Connect to the database and start the server
connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
})

