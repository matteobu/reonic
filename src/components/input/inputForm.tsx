import React, { useState } from 'react';
import { DEFAULT_INPUT_VALUES } from '../../utils/constants';
import { validateForm } from '../../utils/utils';
import { useData } from '../../context/DataContext';

const ChargingInputForm: React.FC = () => {
  const { setData, toggleModal } = useData();
  const [formData, setFormData] = useState(DEFAULT_INPUT_VALUES);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isFormValid = !Object.values(errors).some((err) => err);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    const error = validateForm(name, numericValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmitData = () => {
    if (Object.values(errors).some((err) => err)) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    toggleModal();
    setData(formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-300 rounded-lg shadow-md text-gray-700">
      <h1 className="text-lg font-bold mb-6 text-center text-gray-600">
        Simulation Parameters
      </h1>

      <div className="mb-0">
        <label
          htmlFor="chargePoints"
          className="block text-sm font-medium border border-gray-300 text-gray-500"
        >
          Charge Points:
        </label>
        <input
          type="number"
          id="chargePoints"
          name="chargePoints"
          min="1"
          max="20"
          value={formData.chargePoints}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            errors.chargePoints ? 'mb-1' : 'mb-5'
          }`}
        />
        {errors.chargePoints && (
          <p className="text-red-400 text-xs border-l-2 border-gray-300">
            {errors.chargePoints}
          </p>
        )}
      </div>

      <div className="mb-0">
        <label
          htmlFor="arrivalProbability"
          className="block text-sm font-medium border border-gray-300 text-gray-500"
        >
          Arrival Probability Multiplier (%):
        </label>
        <input
          type="number"
          id="arrivalProbability"
          name="arrivalProbability"
          min="20"
          max="200"
          value={formData.arrivalProbability}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            errors.arrivalProbability ? 'mb-1' : 'mb-5'
          }`}
        />
        {errors.arrivalProbability && (
          <p className="text-red-400 text-xs border-l-2 border-gray-300">
            {errors.arrivalProbability}
          </p>
        )}
      </div>

      <div className="mb-0">
        <label
          htmlFor="carConsumption"
          className="block text-sm font-medium border border-gray-300 text-gray-500"
        >
          Car Consumption (kWh):
        </label>
        <input
          type="number"
          id="carConsumption"
          name="carConsumption"
          min="12.0"
          max="40.0"
          step="0.5"
          value={formData.carConsumption}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            errors.carConsumption ? 'mb-1' : 'mb-5'
          }`}
        />
        {errors.carConsumption && (
          <p className="text-red-400 text-xs border-l-2 border-gray-300">
            {errors.carConsumption}
          </p>
        )}
      </div>

      <div className="mb-0">
        <label
          htmlFor="chargingPower"
          className="block text-sm font-medium border border-gray-300 text-gray-500"
        >
          Charging Power (kW):
        </label>
        <input
          type="number"
          id="chargingPower"
          name="chargingPower"
          min="1"
          max="11"
          step="0.5"
          value={formData.chargingPower}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            errors.chargingPower ? 'mb-0' : 'mb-5'
          }`}
        />
        {errors.chargingPower && (
          <p className="text-red-400 text-xs mt-1 border-l-2 border-gray-300">
            {errors.chargingPower}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmitData}
        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1 ${
          !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!isFormValid}
      >
        Submit
      </button>
    </div>
  );
};

export default ChargingInputForm;
