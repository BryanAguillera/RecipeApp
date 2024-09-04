import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useGetUserID from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes')
        console.log(response.data);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/saveRecipes/ids/${userID}`);
        console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();

  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put('http://localhost:3001/recipes', { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.log(err);
    }
  }


  const isRecipeSaved = (id) => savedRecipes.includes(id)

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>ALREADY SAVED</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._i) ? "SAVED" : "SAVE"}</button>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default home
