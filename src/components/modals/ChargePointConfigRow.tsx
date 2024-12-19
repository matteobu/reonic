// ChargePointConfigRow.tsx
import React from 'react';
import { ChargePointConfigRowProps } from '../../interfaces';

const ChargePointConfigRow: React.FC<ChargePointConfigRowProps> = ({
  index,
  data,
  onChange,
  onBlur,
}) => {
  return (
    <div className="flex justify-between gap-4 mb-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Charge Points:
        </label>
        <input
          type="number"
          name="chargePoints"
          value={data.chargePoints}
          min="1"
          max="20"
          onChange={(e) => onChange(index, e)}
          onBlur={onBlur}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Charging Power (kW):
        </label>
        <input
          type="number"
          name="chargingPower"
          value={data.chargingPower}
          min="1"
          max="50"
          step="0.5"
          onChange={(e) => onChange(index, e)}
          onBlur={onBlur}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>
    </div>
  );
};

export default ChargePointConfigRow;
