import React from 'react';
import { FilterModalProps } from '../../interfaces';

const FilterModal: React.FC<FilterModalProps> = ({
  mockedData,
  activeCPs,
  toggleCP,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Filter Charge Points</h2>
        <div className="flex flex-wrap gap-4">
          {mockedData.map((cp) => (
            <label key={cp.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={activeCPs.includes(cp.id)}
                onChange={() => toggleCP(cp.id)}
              />
              {cp.id}
            </label>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
