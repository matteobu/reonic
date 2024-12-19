import React, { useState } from 'react';
import { DEFAULT_INPUT_VALUES } from '../../utils/constants';
import { validateForm } from '../../utils/utils';
import { useData } from '../../context/DataContext';
import ChargePointConfigRow from './ChargePointConfigRow';
import { FiMinus, FiPlus } from 'react-icons/fi';
const ChargingInputForm: React.FC = () => {
  const { chargePoints, setData, toggleModal } = useData();
  const [formData, setFormData] = useState(DEFAULT_INPUT_VALUES);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [configs, setConfigs] = useState([
    { chargePoints: chargePoints, chargingPower: 11 },
  ]);
  const isFormValid = !Object.values(errors).some((err) => err);

  const totalChargePoints = configs.reduce(
    (total, config) => total + (config.chargePoints || 0),
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfigChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedConfigs = [...configs];
    updatedConfigs[index] = {
      ...updatedConfigs[index],
      [name]: parseFloat(value) || 0,
    };
    setConfigs(updatedConfigs);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    const error = validateForm(name, numericValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleConfigBlur = () => {
    const totalChargePoints = configs.reduce(
      (total, config) => total + config.chargePoints,
      0
    );
    const totalChargingPower = configs.reduce(
      (total, config) => total + config.chargePoints * config.chargingPower,
      0
    );
    const hasInvalidChargingPower = configs.some(
      (config) => config.chargingPower > 50
    );

    const totalChargePointsError =
      totalChargePoints > 20
        ? `Total charge points (${totalChargePoints}) exceed the maximum allowed (20).`
        : '';

    const totalChargingPowerError = hasInvalidChargingPower
      ? 'Charging power per charge point cannot exceed 50 kW.'
      : totalChargingPower > 220
      ? `Total charging power (${totalChargingPower} kW) exceeds the maximum allowed (220 kW).`
      : '';

    setErrors((prevErrors) => ({
      ...prevErrors,
      configs: totalChargePointsError || totalChargingPowerError,
    }));
  };

  const addConfiguration = () => {
    setConfigs([...configs, { chargePoints: 1, chargingPower: 11 }]);
  };

  const removeConfiguration = () => {
    if (configs.length > 1) {
      setConfigs((prevConfigs) => prevConfigs.slice(0, -1));
    }
  };

  const handleSubmitData = () => {
    if (errors.configs || Object.values(errors).some((err) => err)) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    setData(totalChargePoints);
    toggleModal();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-300 rounded-lg shadow-md text-gray-700">
      <h1 className="text-lg font-bold mb-6 text-center text-gray-600">
        Simulation Parameters
      </h1>
      {configs.map((config, index) => (
        <ChargePointConfigRow
          key={index}
          index={index}
          data={config}
          onChange={(index, e) => handleConfigChange(index, e)}
          onBlur={handleConfigBlur}
        />
      ))}
      {errors.configs && (
        <p className="text-red-400 text-xs mt-2">{errors.configs}</p>
      )}
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
      <div className="mb-0 mt-1 flex justify-between items-center gap-4 bg-gray-200 px-4 py-2 rounded">
        <span className="font-bold text-gray-800 text-sm tracking-wide">
          Charge Point Config
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={addConfiguration}
            className="flex items-center justify-center text-sm font-medium border bg-slate-50 border-green-700 rounded text-gray-900 px-3 py-1 hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalChargePoints >= 20 || configs.length >= 3}
          >
            <FiPlus size={14} />
          </button>
          <button
            onClick={removeConfiguration}
            className="flex items-center justify-center text-sm font-medium border bg-slate-50 border-red-700 rounded text-gray-900 px-3 py-1 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={configs.length <= 1}
          >
            <FiMinus size={14} />
          </button>
        </div>
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
