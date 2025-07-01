import React from 'react';

type StorageType = 'cupboard' | 'pantry' | 'fridge';

interface AddStorageModalProps {
  addingStorageType: StorageType;
  setAddingStorageType: (type: StorageType) => void;
  newStorageName: string;
  setNewStorageName: (name: string) => void;
  handleAddStorage: () => void;
  onClose: () => void;
}

const AddStorageModal: React.FC<AddStorageModalProps> = ({
  addingStorageType,
  setAddingStorageType,
  newStorageName,
  setNewStorageName,
  handleAddStorage,
  onClose,
}) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} title="Close">
        &times;
      </button>
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
        <button style={{ marginTop: 18 }} className="modern-btn" onClick={handleAddStorage}>
          Add Storage
        </button>
      </div>
    </div>
  </div>
);

export default AddStorageModal;