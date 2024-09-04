import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from '../routes/users.js'
import { recipesRouter } from '../routes/recipes.js'

const app = express()

//middlewares
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter)
app.use('/recipes', recipesRouter)

mongoose.connect("mongodb+srv://engrbryanaguillera:akosiayanatakoaypogi04@recipes.f64ep.mongodb.net/recipes")

app.listen(3001, () => {
    console.log("SERVER IS LISTENING TO PORT 3001");
})
