import React, { useEffect, useState } from 'react'
import useGetUserID from '../hooks/useGetUserID';
import axios from 'axios';

const saveRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/saveRecipes/${userID}`);
        console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSavedRecipe();

  }, [])

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe, idx) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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

export default saveRecipe
