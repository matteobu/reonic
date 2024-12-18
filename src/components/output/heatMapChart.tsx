import React, { useState } from 'react';
import chargePointData from '../input/chargepoint_mock_data.json';
import {
  aggregateDailyData,
  calculateSummaries,
  getColor,
} from '../../utils/utils';
import ComponentHeader from './componentHeader';

interface TooltipState {
  content: string;
  x: number;
  y: number;
}

const DailyConsumptionTable: React.FC = () => {
  const mockedData = chargePointData;
  const aggregatedDailyEnergyEvents = aggregateDailyData(mockedData);
  const {
    totalEnergyYear,
    totalEventsYear,
    totalEnergyMonth,
    totalEventsMonth,
    totalEnergyWeek,
    totalEventsWeek,
    totalEnergyDay,
    totalEventsDay,
    highestEnergyDay,
    lowestEnergyDay,
    highestEventsDay,
    lowestEventsDay,
  } = calculateSummaries(aggregatedDailyEnergyEvents);

  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    content: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleDateChange = (newDate: string) => {
    console.log('date', newDate);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ComponentHeader
        name={'Consumption Heatmap'}
        onDateChange={handleDateChange}
      />

      <div className="h-full bg-gray-100 p-4 m-2 shadow-md border border-gray-300 rounded-lg flex flex-col relative">
        <h3 className="text-center text-md font-medium mb-2">Total Energy</h3>
        <div className="flex flex-wrap gap-1 mb-4">
          {aggregatedDailyEnergyEvents.map((entry) => (
            <div
              key={entry.day}
              className={`w-6 h-6 rounded ${getColor(
                entry.totalEnergy
              )} cursor-pointer`}
              onMouseEnter={(e) =>
                handleMouseEnter(
                  e,
                  `Day: ${entry.day}\nEnergy: ${entry.totalEnergy} kWh`
                )
              }
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
        <h3 className="text-center text-md font-medium mb-2">Total Events</h3>
        <div className="flex flex-wrap gap-1">
          {aggregatedDailyEnergyEvents.map((entry) => (
            <div
              key={entry.day}
              className={`w-6 h-6 rounded ${getColor(
                entry.totalEvents
              )} cursor-pointer`}
              onMouseEnter={(e) =>
                handleMouseEnter(
                  e,
                  `Day: ${entry.day}\nEvents: ${entry.totalEvents}`
                )
              }
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none"
            style={{
              top: tooltip.y,
              left: tooltip.x,
              transform: 'translate(-50%, -110%)',
              whiteSpace: 'pre-line',
            }}
          >
            {tooltip.content}
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-center text-lg font-semibold mb-6">Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h4 className="text-blue-600 font-semibold text-md">Yearly</h4>
              <p className="text-gray-700 text-sm mt-2">
                <span className="block font-bold text-lg">
                  {totalEnergyYear} kWh
                </span>
                Energy
              </p>
              <p className="text-gray-700 text-sm mt-1">
                <span className="block font-bold text-lg">
                  {totalEventsYear}
                </span>
                Events
              </p>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h4 className="text-blue-600 font-semibold text-md">
                Monthly (Avg)
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                <span className="block font-bold text-lg">
                  {totalEnergyMonth} kWh
                </span>
                Energy
              </p>
              <p className="text-gray-700 text-sm mt-1">
                <span className="block font-bold text-lg">
                  {totalEventsMonth}
                </span>
                Events
              </p>
            </div>

            {/* Weekly Summary */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h4 className="text-blue-600 font-semibold text-md">
                Weekly (Avg)
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                <span className="block font-bold text-lg">
                  {totalEnergyWeek} kWh
                </span>
                Energy
              </p>
              <p className="text-gray-700 text-sm mt-1">
                <span className="block font-bold text-lg">
                  {totalEventsWeek}
                </span>
                Events
              </p>
            </div>

            {/* Daily Summary */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h4 className="text-blue-600 font-semibold text-md">
                Daily (Avg)
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                <span className="block font-bold text-lg">
                  {totalEnergyDay} kWh
                </span>
                Energy
              </p>
              <p className="text-gray-700 text-sm mt-1">
                <span className="block font-bold text-lg">
                  {totalEventsDay}
                </span>
                Events
              </p>
            </div>
            <div className="mt-6 text-sm text-gray-700">
              <h4 className="text-lg font-semibold mb-4">
                Additional Insights
              </h4>
              <p>
                <strong>Highest Total Energy:</strong> {highestEnergyDay.day} (
                {highestEnergyDay.totalEnergy} kWh)
              </p>
              <p>
                <strong>Lowest Total Energy:</strong> {lowestEnergyDay.day} (
                {lowestEnergyDay.totalEnergy} kWh)
              </p>
              <p>
                <strong>Most Events:</strong> {highestEventsDay.day} (
                {highestEventsDay.totalEvents} Events)
              </p>
              <p>
                <strong>Least Events:</strong> {lowestEventsDay.day} (
                {lowestEventsDay.totalEvents} Events)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyConsumptionTable;
