import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import ComponentHeader from './componentHeader';
import {
  ChargePointData,
  HourlyData,
} from '../../interfaces/outputs.interfaces';
import chargePointData from '../../data/chargepoint_mock_data.json';
import { CP_COLORS } from '../../utils/constants';
import HourDetailsModal from '../modals/HourDetailsModal';
import FilterModal from '../modals/FilterCPModal';

const HourlyChargingChart: React.FC = () => {
  const mockedData: ChargePointData[] = chargePointData;
  const [showHourModal, setShowHourModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [hourlyChargingData, setHourlyChargingData] = useState<HourlyData[]>(
    []
  );
  const [activeCPs, setActiveCPs] = useState<string[]>(
    mockedData.map((cp) => cp.id)
  );

  const handleDateChange = (newDate: string) => {
    const filteredByDay = mockedData.map((cp) => {
      const dayData = cp.dailyData.find((data) => data.day === newDate);
      return {
        id: cp.id,
        day: dayData?.day,
        totalEnergy: dayData?.totalEnergy,
      };
    });

    const hours = Array.from(
      { length: 24 },
      (_, i) => `${i.toString().padStart(2, '0')}:00`
    );

    const hourlyChargingData: HourlyData[] = hours.map((hour: string) => {
      const hourData: HourlyData = { hour };
      filteredByDay.forEach((entry) => {
        if (entry.totalEnergy !== undefined) {
          const randomDistribution = distributeRandomly(entry.totalEnergy, 24);
          hourData[entry.id] = Number(randomDistribution.shift()?.toFixed(2));
        }
      });
      return hourData;
    });

    setHourlyChargingData(hourlyChargingData);
  };

  const toggleCP = (cpId: string) => {
    setActiveCPs((prev) =>
      prev.includes(cpId) ? prev.filter((id) => id !== cpId) : [...prev, cpId]
    );
  };

  const filteredData = hourlyChargingData.map((data) => {
    const filteredEntry: HourlyData = { hour: data.hour };
    activeCPs.forEach((cpId) => {
      if (data[cpId] !== undefined) {
        filteredEntry[cpId] = data[cpId];
      }
    });
    return filteredEntry;
  });

  return (
    <div className="flex flex-col w-full h-full">
      <ComponentHeader
        name={'Hourly Chart'}
        onDateChange={handleDateChange}
        isOnDateChange={true}
      >
        <>
          <button
            onClick={() => setShowHourModal(true)}
            className="px-4 h-7 bg-gray-50 text-gray-600 rounded-md shadow"
          >
            Show Hour Details
          </button>
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 h-7  bg-gray-50 text-gray-600 rounded-md shadow"
          >
            Filter Charge Points
          </button>
        </>
      </ComponentHeader>

      {showHourModal && (
        <HourDetailsModal
          selectedHour={selectedHour}
          hourlyChargingData={hourlyChargingData}
          setSelectedHour={setSelectedHour}
          onClose={() => setShowHourModal(false)}
        />
      )}

      {showFilterModal && (
        <FilterModal
          mockedData={mockedData}
          activeCPs={activeCPs}
          toggleCP={toggleCP}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      <div className="w-[98%] flex-1 p-4 m-2 bg-gray-100 rounded-lg shadow-md border border-gray-200 h-[45vh]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis
              label={{ value: 'kW', angle: -90, position: 'insideLeft' }}
            />
            <Legend />
            {activeCPs.map((cpId) => (
              <Line
                key={cpId}
                type="monotone"
                dataKey={cpId}
                stroke={CP_COLORS[cpId] || '#000'}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-[98%] flex-1 p-4 m-2 bg-gray-100 rounded-lg shadow-md border border-gray-200 h-[45vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis
              label={{ value: 'kW', angle: -90, position: 'insideLeft' }}
            />
            <Legend />
            {activeCPs.map((cpId) => (
              <Bar
                key={cpId}
                dataKey={cpId}
                stackId="a"
                fill={CP_COLORS[cpId] || '#000'}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyChargingChart;

const distributeRandomly = (total: number, parts: number): number[] => {
  const values = Array.from({ length: parts }, () => Math.random());
  const sum = values.reduce((acc, val) => acc + val, 0);
  return values.map((val) => (val / sum) * total);
};
