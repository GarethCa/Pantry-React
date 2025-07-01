import React from 'react';

interface PantryViewProps {
  ingredients: { [key: string]: string[] }; // Define the type for the ingredients prop
}

const PantryView: React.FC<PantryViewProps> = ({ ingredients }) => {
  return (
    <div>
      <h2>Pantry</h2>
      {Object.entries(ingredients).map(([location, items]) => (
        <div key={location}>
          <h3>{location}</h3>
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

export default PantryView;