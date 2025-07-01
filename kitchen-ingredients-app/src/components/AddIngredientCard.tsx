import React from 'react';

interface AddIngredientCardProps {
  open: boolean;
  newIngredient: { name: string; quantity: number; units: string; image?: string };
  setNewIngredient: (v: { name: string; quantity: number; units: string; image?: string }) => void;
  onAdd: () => void;
  onCancel: () => void;
  onOpen: () => void;
}

const AddIngredientCard: React.FC<AddIngredientCardProps> = ({
  open,
  newIngredient,
  setNewIngredient,
  onAdd,
  onCancel,
  onOpen,
}) =>
  !open ? (
    <div
      className="ingredient-card ingredient-add-card"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#2da44e',
        fontSize: '2.5em',
      }}
      onClick={onOpen}
      title="Add Ingredient"
    >
      <span>+</span>
    </div>
  ) : (
    <div className="ingredient-card ingredient-add-card">
      <div className="ingredient-image-top">
        <img
          src={
            newIngredient.name
              ? `/images/ingredients/${newIngredient.name.toLowerCase().replace(/\s/g, '-')}.jpg`
              : '/images/ingredients/placeholder.jpg'
          }
          alt={newIngredient.name || 'New Ingredient'}
          onError={e => {
            (e.target as HTMLImageElement).src = '/images/ingredients/placeholder.jpg';
          }}
        />
      </div>
      <div className="ingredient-fields">
        <input
          type="text"
          placeholder="Name"
          value={newIngredient.name}
          onChange={e => setNewIngredient({ ...newIngredient, name: e.target.value })}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            min={0}
            placeholder="Qty"
            value={newIngredient.quantity}
            onChange={e => setNewIngredient({ ...newIngredient, quantity: Number(e.target.value) })}
            style={{ width: 60 }}
          />
          <input
            type="text"
            placeholder="Units"
            value={newIngredient.units}
            onChange={e => setNewIngredient({ ...newIngredient, units: e.target.value })}
            style={{ width: 60 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            className="modern-btn"
            style={{ flex: 1 }}
            onClick={onAdd}
            type="button"
          >
            Add
          </button>
          <button
            className="modern-btn cancel"
            style={{ flex: 1 }}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

export default AddIngredientCard;