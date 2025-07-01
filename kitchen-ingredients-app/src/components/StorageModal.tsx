import React from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientCard from './AddIngredientCard';

type StorageType = 'cupboard' | 'pantry' | 'fridge';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  units: string;
  image?: string;
}

interface StorageUnit {
  id: string;
  type: StorageType;
  name: string;
  ingredients: Ingredient[];
}

interface StorageModalProps {
  storage: StorageUnit;
  storageTypeLabels: Record<StorageType, string>;
  handleIngredientChange: (
    storageId: string,
    ingredientId: string,
    field: keyof Ingredient,
    value: string | number
  ) => void;
  addCardOpen: boolean;
  setAddCardOpen: (v: boolean) => void;
  newIngredient: { name: string; quantity: number; units: string; image?: string };
  setNewIngredient: (v: { name: string; quantity: number; units: string; image?: string }) => void;
  handleAddIngredient: (storageId: string) => void;
  onClose: () => void;
}

const StorageModal: React.FC<StorageModalProps> = ({
  storage,
  storageTypeLabels,
  handleIngredientChange,
  addCardOpen,
  setAddCardOpen,
  newIngredient,
  setNewIngredient,
  handleAddIngredient,
  onClose,
}) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} title="Close">
        &times;
      </button>
      <h2>
        {storage.name}{' '}
        <span style={{ fontSize: '0.7em', color: '#57606a' }}>
          ({storageTypeLabels[storage.type]})
        </span>
      </h2>
      <div className="ingredient-cards">
        {storage.ingredients.map(ingredient => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            onChange={(field, value) =>
              handleIngredientChange(storage.id, ingredient.id, field, value)
            }
          />
        ))}
        <AddIngredientCard
          open={addCardOpen}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          onAdd={() => {
            handleAddIngredient(storage.id);
            setAddCardOpen(false);
          }}
          onCancel={() => {
            setAddCardOpen(false);
            setNewIngredient({ name: '', quantity: 1, units: '', image: '' });
          }}
          onOpen={() => setAddCardOpen(true)}
        />
      </div>
    </div>
  </div>
);

export default StorageModal;