import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    //username
    const user = await UserModel.findOne({ username })
    if (user) {
        return res.json({ message: "Username is already taken" })
    }
    //password
    const hashedPassword = await bcrypt.hash(password, 10)

    //saving
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save()

    res.json({ message: "User registed successfully" })
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "No user found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        res.json({ message: "Username or Password is Incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id })
});

export { router as userRouter };