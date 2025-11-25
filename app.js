const express = require("express")
const app = express()
const dotenv = require("dotenv")
const {funDb} = require("./src/config/dbConnect.js")

// db connected
funDb()

// config env file
dotenv.config()





// middleware
app.use(express.json())




const PORT =  process.env.SERVER_RUNNING_PORT || 3000 
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})
