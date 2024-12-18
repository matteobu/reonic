import React from 'react';

interface HourDetailsModalProps {
  selectedHour: string | null;
  hourlyChargingData: any[];
  onClose: () => void;
  setSelectedHour: (hour: string) => void;
}

const HourDetailsModal: React.FC<HourDetailsModalProps> = ({
  selectedHour = '12:00',
  hourlyChargingData,
  onClose,
  setSelectedHour,
}) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md md:max-w-lg lg:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Details for {selectedHour || '12:00'}
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Hour
          </label>
          <select
            value={selectedHour || '12:00'}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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

        <div className="border-t border-gray-300 mt-4 pt-4 max-h-[50vh] overflow-y-auto">
          {hourlyChargingData
            .filter((data) => data.hour === (selectedHour || '12:00'))
            .map((data) => (
              <div key={data.hour}>
                {Object.entries(data)
                  .filter(([key]) => key !== 'hour')
                  .map(([cp, value]) => (
                    <p
                      key={cp}
                      className="text-sm text-gray-700 mb-2 flex justify-between"
                    >
                      <span className="font-medium">{cp}</span>
                      <span>{String(value)} kW</span>{' '}
                    </p>
                  ))}
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HourDetailsModal;
