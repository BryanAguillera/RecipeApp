import React, { useState } from 'react'
import axios from 'axios'
import useGetUserID from '../hooks/useGetUserID'
import {useNavigate} from 'react-router-dom'

const createRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    cookingTime: 0,
    imageURL: "",
    userOwner: userID
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRecipe({... recipe, [name]: value})
  }

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, " "] })
  }

  const handleIngredientChange = (e, idx) => {
    const {value} = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe, ingredients})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe)
      alert("Recipe Added")
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='w-1/2 mx-auto text-center border-red-300 border-2'>
      <h2 className='text-3xl text-blue-900 uppercase'>Create Recipe</h2>
      <form 
        onSubmit={onSubmit}
        className='flex flex-col items-center w-full border'  
      >

        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id='name' 
          name='name'
          onChange={handleChange} 
          className='border border-black w-full'
        
        />

        <label htmlFor="ingredients">Ingredients</label>
        <button 
          onClick={addIngredient} 
          type='button'
          className='border border-black p-2 rounded-lg'
          
        >  
          Add Ingredients
        </button>

        {recipe.ingredients.map((ingredient, idx) => (
          <input 
            key={idx} 
            type='text' 
            name='ingredients' 
            value={ingredient} 
            onChange={(e) => handleIngredientChange(e, idx)}
            className='border border-black w-full'
          />
        ))}


        <label htmlFor="instructions">Instructions</label>
        <textarea 
          name="instructions" 
          id="instructions" 
          onChange={handleChange}
          className='border border-black w-full' 
        >  
        </textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input 
          type="text"
          name='imageURL'
          id='imageUrl' 
          onChange={handleChange}
          className='border border-black w-full'
        
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input 
          type="number" 
          id='cookingTime' 
          name='cookingTime' 
          onChange={handleChange} 
          className='border border-black w-full'
          
        />

        <button 
          type='submit'
          className='border border-black p-2 rounded-lg'
        >
        CREATE RECIPE
        </button>
      </form>
    </div>
  )
}

export default createRecipe
