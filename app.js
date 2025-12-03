const express = require("express")
const app = express()
const dotenv = require("dotenv")
const {funDb} = require("./src/config/dbConnect.js")
const authRoutes = require("./src/routes/auth.routes.js")
const profileRoutes = require("./src/routes/profile.routes.js")
const serviceRoutes = require("./src/routes/services.routes.js")
const cookieParser = require("cookie-parser")
const authMiddleware = require("./src/middleware/authMiddleware.js")

// db connected
funDb()

// config env file
dotenv.config()



// middleware
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/profile",authMiddleware,profileRoutes)
app.use("/api/v1/service",serviceRoutes)




const PORT =  process.env.SERVER_RUNNING_PORT || 3000 
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})
