import React from 'react';
import { HourDetailsModalProps } from '../../interfaces';

const HourDetailsModal: React.FC<HourDetailsModalProps> = ({
  selectedHour = '12:00',
  hourlyChargingData,
  onClose,
  setSelectedHour,
}) => {
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
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Hour Details for <span className="text-blue-600">{selectedHour}</span>
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Select Hour
          </label>
          <select
            value={selectedHour || '12:00'}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base transition"
          >
            {Array.from({ length: 24 }, (_, i) => {
              const hour = `${i.toString().padStart(2, '0')}:00`;
              return (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4 max-h-[50vh] overflow-y-auto">
          {hourlyChargingData
            .filter((data) => data.hour === (selectedHour || '12:00'))
            .map((data) => (
              <div key={data.hour} className="space-y-3">
                {Object.entries(data)
                  .filter(([key]) => key !== 'hour')
                  .map(([cp, value]) => (
                    <div
                      key={cp}
                      className="flex justify-between items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-semibold text-gray-800">{cp}</span>
                      <span className="text-gray-600">{String(value)} kW</span>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HourDetailsModal;
