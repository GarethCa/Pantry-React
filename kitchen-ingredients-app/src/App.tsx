import React, { useState, useEffect } from 'react';
import MealRecommendations from './components/MealRecommendations';
import StorageModal from './components/StorageModal';
import './App.css';

type StorageType = 'cupboard' | 'pantry' | 'fridge';

const storageTypeLabels: Record<StorageType, string> = {
  cupboard: 'Cupboard',
  pantry: 'Pantry',
  fridge: 'Fridge',
};

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

const App: React.FC = () => {
  const [tab, setTab] = useState<'storage' | 'meals'>('storage');
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([
    { id: '1', type: 'fridge', name: 'Fridge', ingredients: [] },
    { id: '2', type: 'cupboard', name: 'Cupboard', ingredients: [] },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState<string | null>(null);
  const [newIngredient, setNewIngredient] = useState<{ name: string; quantity: number; units: string; image?: string }>({
    name: '',
    quantity: 1,
    units: '',
  });
  const [addingStorageType, setAddingStorageType] = useState<StorageType>('cupboard');
  const [newStorageName, setNewStorageName] = useState('');
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleAddStorage = () => {
    if (!newStorageName.trim()) return;
    setStorageUnits([
      ...storageUnits,
      {
        id: Date.now().toString(),
        type: addingStorageType,
        name: newStorageName,
        ingredients: [],
      },
    ]);
    setNewStorageName('');
    setAddingStorageType('cupboard');
    setShowAddModal(false);
  };

  const handleAddIngredient = (storageId: string) => {
    if (!newIngredient.name.trim()) return;
    setStorageUnits(units =>
      units.map(unit =>
        unit.id === storageId
          ? {
              ...unit,
              ingredients: [
                ...unit.ingredients,
                {
                  id: Date.now().toString(),
                  ...newIngredient,
                },
              ],
            }
          : unit
      )
    );
    setNewIngredient({ name: '', quantity: 1, units: '', image: '' });
  };

  const handleIngredientChange = (
    storageId: string,
    ingredientId: string,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setStorageUnits(units =>
      units.map(unit =>
        unit.id === storageId
          ? {
              ...unit,
              ingredients: unit.ingredients.map(ing =>
                ing.id === ingredientId ? { ...ing, [field]: value } : ing
              ),
            }
          : unit
      )
    );
  };

  const selectedStorage = storageUnits.find(u => u.id === showStorageModal);

  return (
    <div className="app-container">
      <button
        className="add-btn"
        style={{
          position: 'absolute',
          top: 18,
          right: 24,
          width: 38,
          height: 38,
          borderRadius: '50%',
          fontSize: '1.2em',
          background: darkMode ? '#23272f' : '#f6f8fa',
          color: darkMode ? '#4ade80' : '#2da44e',
          border: '1.5px solid var(--card-border)',
          boxShadow: '0 1px 4px rgba(27,31,35,0.07)',
          zIndex: 100,
        }}
        onClick={() => setDarkMode(dm => !dm)}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle dark mode"
        type="button"
      >
        {darkMode ? (
          <span role="img" aria-label="Light">🌞</span>
        ) : (
          <span role="img" aria-label="Dark">🌙</span>
        )}
      </button>
      <h1>Kitchen Ingredients App</h1>
      <div className="tabs">
        <button
          className={`tab-btn${tab === 'storage' ? ' selected' : ''}`}
          onClick={() => setTab('storage')}
          type="button"
          aria-selected={tab === 'storage'}
          tabIndex={tab === 'storage' ? 0 : -1}
        >
          <span role="img" aria-label="Storage" style={{ marginRight: 8 }}>🗄️</span>
          Storage
        </button>
        <button
          className={`tab-btn${tab === 'meals' ? ' selected' : ''}`}
          onClick={() => setTab('meals')}
          type="button"
          aria-selected={tab === 'meals'}
          tabIndex={tab === 'meals' ? 0 : -1}
        >
          <span role="img" aria-label="Meals" style={{ marginRight: 8 }}>🍽️</span>
          Meal Recommendations
        </button>
      </div>
      {tab === 'storage' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <h2 style={{ flex: 1 }}>Kitchen Storage</h2>
            <button className="add-btn" title="Add Storage" onClick={() => setShowAddModal(true)}>
              +
            </button>
          </div>
          <div className="storage-cards">
            {storageUnits.map(unit => (
              <div
                key={unit.id}
                className="storage-card"
                onClick={() => {
                  setShowStorageModal(unit.id);
                  setAddCardOpen(false);
                  setNewIngredient({ name: '', quantity: 1, units: '', image: '' });
                }}
              >
                <span className="storage-type-icon" style={{ fontSize: '2em', marginBottom: 6, display: 'block' }}>
                  {unit.type === 'cupboard' && '🗄️'}
                  {unit.type === 'pantry' && '🧺'}
                  {unit.type === 'fridge' && '🧊'}
                </span>
                <h4>{unit.name}</h4>
                <p>{storageTypeLabels[unit.type]}</p>
                <p>
                  {unit.ingredients.length} ingredient{unit.ingredients.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
          {/* Add Storage Modal */}
          {showAddModal && (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowAddModal(false)} title="Close">&times;</button>
                <h2>Add New Storage</h2>
                <div className="add-storage-form" style={{ flexDirection: 'column', gap: 18 }}>
                  <div className="storage-type-card-row">
                    <button
                      type="button"
                      className={`storage-type-card${addingStorageType === 'cupboard' ? ' selected' : ''}`}
                      onClick={() => setAddingStorageType('cupboard')}
                      aria-label="Cupboard"
                    >
                      <span className="storage-type-icon" role="img" aria-label="Cupboard">🗄️</span>
                      <span>Cupboard</span>
                    </button>
                    <button
                      type="button"
                      className={`storage-type-card${addingStorageType === 'pantry' ? ' selected' : ''}`}
                      onClick={() => setAddingStorageType('pantry')}
                      aria-label="Pantry"
                    >
                      <span className="storage-type-icon" role="img" aria-label="Pantry">🧺</span>
                      <span>Pantry</span>
                    </button>
                    <button
                      type="button"
                      className={`storage-type-card${addingStorageType === 'fridge' ? ' selected' : ''}`}
                      onClick={() => setAddingStorageType('fridge')}
                      aria-label="Fridge"
                    >
                      <span className="storage-type-icon" role="img" aria-label="Fridge">🧊</span>
                      <span>Fridge</span>
                    </button>
                  </div>
                  <label style={{ marginTop: 10 }}>
                    Name:
                    <input
                      type="text"
                      placeholder="Storage Name"
                      value={newStorageName}
                      onChange={e => setNewStorageName(e.target.value)}
                      style={{ marginLeft: 8, width: '70%' }}
                    />
                  </label>
                  <button style={{ marginTop: 18 }} className="modern-btn" onClick={handleAddStorage}>Add Storage</button>
                </div>
              </div>
            </div>
          )}
          {/* Storage Details Modal */}
          {showStorageModal && selectedStorage && (
            <StorageModal
              storage={selectedStorage}
              storageTypeLabels={storageTypeLabels}
              handleIngredientChange={handleIngredientChange}
              addCardOpen={addCardOpen}
              setAddCardOpen={setAddCardOpen}
              newIngredient={newIngredient}
              setNewIngredient={setNewIngredient}
              handleAddIngredient={handleAddIngredient}
              onClose={() => setShowStorageModal(null)}
            />
          )}
        </div>
      )}
      {tab === 'meals' && <MealRecommendations />}
    </div>
  );
};

export default App;