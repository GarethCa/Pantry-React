import React, { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  units: string;
  image?: string;
}

interface IngredientCardProps {
  ingredient: Ingredient;
  onChange: (field: keyof Ingredient, value: string | number) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(ingredient);

  const handleSave = () => {
    if (
      local.name !== ingredient.name ||
      local.quantity !== ingredient.quantity ||
      local.units !== ingredient.units
    ) {
      onChange('name', local.name);
      onChange('quantity', local.quantity);
      onChange('units', local.units);
    }
    setEditing(false);
  };

  return (
    <div className="ingredient-card" style={{ position: 'relative' }}>
      <div className="ingredient-image-top">
        <img
          src={
            ingredient.image && ingredient.image.trim() !== ''
              ? ingredient.image
              : `/images/ingredients/${ingredient.name.toLowerCase().replace(/\s/g, '-')}.jpg`
          }
          alt={ingredient.name}
          onError={e => {
            (e.target as HTMLImageElement).src = '/images/ingredients/placeholder.jpg';
          }}
        />
      </div>
      {!editing ? (
        <button
          className="ingredient-edit-btn"
          aria-label="Edit"
          onClick={() => {
            setLocal(ingredient);
            setEditing(true);
          }}
          type="button"
        >
          {/* Pencil Icon */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.7 }}>
            <path d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1zm-2.12 2.12l1.7 1.7-8.43 8.43c-.13.13-.29.23-.47.27l-3.02.67a.5.5 0 0 1-.6-.6l.67-3.02c.04-.18.14-.34.27-.47l8.43-8.43z" fill="#57606a"/>
          </svg>
        </button>
      ) : (
        <button
          className="ingredient-edit-btn"
          aria-label="Save"
          onClick={handleSave}
          type="button"
        >
          {/* Floppy Disk Icon */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.7 }}>
            <rect x="3" y="2" width="14" height="16" rx="2" fill="#57606a"/>
            <rect x="6" y="4" width="8" height="4" rx="1" fill="#fff"/>
            <rect x="7" y="12" width="6" height="4" rx="1" fill="#fff"/>
            <rect x="9" y="6" width="2" height="2" rx="1" fill="#57606a"/>
          </svg>
        </button>
      )}
      <div className="ingredient-fields">
        {editing ? (
          <>
            <input
              type="text"
              value={local.name}
              onChange={e => setLocal({ ...local, name: e.target.value })}
              placeholder="Name"
              autoFocus
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                min={0}
                value={local.quantity}
                onChange={e => setLocal({ ...local, quantity: Number(e.target.value) })}
                style={{ width: 60 }}
                placeholder="Qty"
              />
              <input
                type="text"
                value={local.units}
                onChange={e => setLocal({ ...local, units: e.target.value })}
                style={{ width: 60 }}
                placeholder="Units"
              />
            </div>
          </>
        ) : (
          <>
            <div className="ingredient-name">{ingredient.name}</div>
            <div className="ingredient-qty">
              {ingredient.quantity} {ingredient.units}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientCard;