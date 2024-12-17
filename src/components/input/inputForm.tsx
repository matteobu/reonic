import React, { useState } from 'react';
import { DEFAULT_INPUT_VALUES } from '../../utils/constants';
import { validateForm } from '../../utils/utils';
import { useData } from '../../context/DataContext';

const ChargingInputForm: React.FC = () => {
  const { setData, toggleModal } = useData();
  const [formData, setFormData] = useState(DEFAULT_INPUT_VALUES);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateForm(name, parseInt(e.target.value, 10));
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitData = () => {
    // This update the Context
    toggleModal();
    setData(formData);
  };

  return (
    <div className="p-4 h-full max-w-md mx-auto bg-gray-100 text-gray-500">
      <h1 className="text-l font-bold mb-4">Simulation Parameters</h1>
      {/* CHARGE POINT */}
      <div className="mb-4">
        <label
          className="block text-gray-400 text-sm font-sans font-medium mb-2"
          htmlFor="chargePoints"
        >
          Charge Points: {formData.chargePoints}
        </label>
        <input
          type="range"
          id="chargePoints"
          name="chargePoints"
          min="1"
          max="20"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          value={formData.chargePoints}
          onChange={handleChange}
        />
      </div>
      {/* PROBABILITY */}
      <div className="mb-4">
        <label
          className="block text-gray-400 text-sm font-sans font-medium mb-2"
          htmlFor="arrivalProbability"
        >
          Arrival Probability Multiplier: {formData.arrivalProbability}%
        </label>
        <input
          type="range"
          id="arrivalProbability"
          name="arrivalProbability"
          min="20"
          max="200"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          value={formData.arrivalProbability}
          onChange={handleChange}
        />
      </div>
      {/* CONSUMPTION */}
      <div className="mb-4">
        <label
          className="block text-gray-400 text-sm font-sans font-medium mb-2"
          htmlFor="carConsumption"
        >
          Car Consumption: {formData.carConsumption}kWh
        </label>
        <input
          type="range"
          id="carConsumption"
          name="carConsumption"
          min="12.0"
          max="40.0"
          step="0.5"
          defaultValue="18.0"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          value={formData.carConsumption}
          onChange={handleChange}
        />
      </div>
      {/* CHARGING POWER */}
      <div className="mb-4">
        <label
          className="block text-gray-400 text-sm font-sans font-medium mb-2"
          htmlFor="chargingPower"
        >
          Charging Power: {formData.chargingPower}kW
        </label>
        <input
          type="range"
          id="chargingPower"
          name="chargingPower"
          min="1"
          max="11"
          defaultValue="11"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          value={formData.chargingPower}
          onChange={handleChange}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        onClick={handleSubmitData}
      >
        Submit
      </button>
    </div>
  );
};

export default ChargingInputForm;
