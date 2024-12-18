import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChargePointData } from '../../utils/interfaces';
import TotalEnergyChart from './totalEnergyChart';
import chargePointData from '../input/chargepoint_mock_data.json';
import ComponentHeader from './componentHeader';

type DailyDataKeys = 'BULK' | 'FLOATING' | 'ABS';

const DailyChargingChart: React.FC = () => {
  const mockedData: ChargePointData[] = chargePointData;
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-01');
  const [selectedCP] = useState<string>(mockedData[0]?.id || '');
  const [dailyData, setDailyData] = useState<ChargePointData[]>([]);
  const [cpData, setCpData] = useState<ChargePointData | undefined>(undefined);
  const [barChartData, setBarChartData] = useState<
    { id: string; ABS: number; FLOATING: number; BULK: number }[]
  >([]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const filteredByDay = mockedData.map((cp) => {
      const dayData = cp.dailyData.find((data) => data.day === newDate);
      return { ...cp, dailyData: dayData ? [dayData] : [] };
    });

    const selectedCPData = filteredByDay.find((cp) => cp.id === selectedCP);
    const barData = filteredByDay.map((data) => ({
      id: data.id,
      ABS: data.dailyData[0].ABS,
      FLOATING: data.dailyData[0].FLOATING,
      BULK: data.dailyData[0].BULK,
    }));

    setDailyData(filteredByDay);
    setBarChartData(barData);
    setCpData(selectedCPData);
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Component Header */}
      <ComponentHeader
        name={'Daily Charging Chart'}
        onDateChange={handleDateChange}
      />

      {/* Bar Chart */}
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis
              label={{ value: 'kW', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="BULK" stackId="a" fill="#9AA6B2" />
            <Bar dataKey="FLOATING" stackId="a" fill="#789DBC" />
            <Bar dataKey="ABS" stackId="a" fill="#A2D2DF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row w-full mt-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Aggregate Metrics */}
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-center font-semibold mb-2 border-b border-gray-300">
            Aggregate Metrics
          </h3>
          {cpData && (
            <div className="space-y-2">
              {(Object.keys(cpData.dailyData[0]) as DailyDataKeys[]).map(
                (key) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{`Total ${key}`}</span>
                    <span className="font-semibold">
                      {cpData.dailyData[0][key]} kWh
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Total Energy Chart */}
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <TotalEnergyChart
            selectedDate={selectedDate}
            filteredData={dailyData}
          />
        </div>

        {/* Error Logs */}
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-center font-semibold mb-4 border-b border-gray-300">
            Error Logs
          </h3>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {dailyData
              .filter((cp) => cp.errors > 0)
              .map((cp) => (
                <div
                  key={cp.id}
                  className="p-2 bg-red-100 rounded text-red-800"
                >
                  {`${cp.id}: ${cp.errors} Errors`}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChargingChart;
