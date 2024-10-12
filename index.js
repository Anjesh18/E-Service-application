import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router } from './routers/UserRouter.js'
import { serviceRouter } from './routers/ServiceRoute.js'

const app=express()
app.use(cors(
    {origin:'http://localhost:5173',
    credentials: true}

))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use('/api/users', router)
app.use('/api/service', serviceRouter)

app.get('/',(req,res)=>{
    res.send("hello world")
})

mongoose.connect('mongodb://127.0.0.1:27017/e-serve').then(()=>console.log('database connected'))

app.listen(8888,()=>{
    console.log('App listening to port 8888')
})