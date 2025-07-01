import React, { useState } from 'react';
import './MealRecommendations.css'; // Add styles for the cards

interface Meal {
  id: number;
  name: string;
  image: string;
  matchPercentage: number;
  cookTime: string;
}

const MealRecommendations: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      image: '/images/spaghetti-bolognese.jpg',
      matchPercentage: 85,
      cookTime: '30 minutes',
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      image: '/images/vegetable-stir-fry.jpg',
      matchPercentage: 70,
      cookTime: '20 minutes',
    },
    {
      id: 3,
      name: 'Chicken Curry',
      image: '/images/chicken-curry.jpg',
      matchPercentage: 90,
      cookTime: '40 minutes',
    },
  ]);

  const handleThumbsUp = (mealId: number) => {
    alert(`You liked meal ID: ${mealId}`);
  };

  const handleThumbsDown = (mealId: number) => {
    alert(`You disliked meal ID: ${mealId}`);
  };

  return (
    <div className="meal-recommendations">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-card">
          <img src={meal.image} alt={meal.name} className="meal-image" />
          <h3>{meal.name}</h3>
          <p>Match: {meal.matchPercentage}%</p>
          <p>Cook Time: {meal.cookTime}</p>
          <div className="meal-actions">
            <button onClick={() => handleThumbsUp(meal.id)}>👍</button>
            <button onClick={() => handleThumbsDown(meal.id)}>👎</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealRecommendations;