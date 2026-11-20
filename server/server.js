import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoute.js'
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cartRoutes.js'
import cors from "cors"
import dns from "dns"

// to access .env variables
dotenv.config()

const app = express()

dns.setServers(["8.8.8.8"])

// to convert json data to original form
app.use(express.json()) //built-in middleware

app.use(cors({ origin: "https://fullstack-quickcart.vercel.app", credentials: true }))

//to access cookies
app.use(cookieParser()) //also a middleware but third party



//Establishing mongodb connection
connectDB()

//register routes
app.use(authRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(usersRoutes)


app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})