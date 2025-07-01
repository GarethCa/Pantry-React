import React from 'react';

interface IngredientListProps {
  ingredients: { [key: string]: string[] };
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <div>
      <h2>Ingredient List</h2>
      {Object.entries(ingredients).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;