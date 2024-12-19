import React from 'react';
import { FilterModalProps } from '../../interfaces';
import { useTranslation } from 'react-i18next';

const FilterModal: React.FC<FilterModalProps> = ({
  mockedData,
  activeCPs,
  toggleCP,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity"
      style={{ zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-md md:max-w-lg lg:max-w-xl transform scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
          {t('filterModal.title')}
        </h2>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {mockedData.map((cp) => {
            const isActive = activeCPs.includes(cp.id);
            return (
              <div
                key={cp.id}
                onClick={() => toggleCP(cp.id)}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm cursor-pointer transition ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">{cp.id}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isActive
                    ? t('filterModal.status.activated')
                    : t('filterModal.status.notActivated')}{' '}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
