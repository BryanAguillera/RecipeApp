import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (err) {
        res.log(err);
    }
})

router.post('/', verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(recipe)
    } catch (err) {
        res.json(err);
    }
})

router.put('/', verifyToken, async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID) //recipe id
    const user = await UserModel.findById(req.body.userID) // user id
    try {
        user.savedRecipes.push(recipe) // adding the recipe to the users saved recipe
        await user.save(); // saving 
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
})


router.get("/saveRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err)
    }
})

router.get("/saveRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        // res.json({ savedRecipes: user?.savedRecipes })
        console.log(savedRecipes);
        res.json({ savedRecipes })

    } catch (err) {
        res.json(err)
    }
})

export { router as recipesRouter }

