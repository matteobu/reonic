import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const hourlyChargingData = [
  { hour: '00:00', CP1: 10, CP2: 15, CP3: 5 },
  { hour: '01:00', CP1: 20, CP2: 25, CP3: 10 },
  { hour: '02:00', CP1: 15, CP2: 20, CP3: 8 },
  { hour: '03:00', CP1: 18, CP2: 30, CP3: 12 },
  { hour: '04:00', CP1: 12, CP2: 18, CP3: 6 },
  { hour: '05:00', CP1: 8, CP2: 12, CP3: 4 },
  { hour: '06:00', CP1: 10, CP2: 15, CP3: 5 },
  { hour: '07:00', CP1: 25, CP2: 30, CP3: 20 },
  { hour: '08:00', CP1: 30, CP2: 40, CP3: 25 },
  { hour: '09:00', CP1: 35, CP2: 45, CP3: 30 },
  { hour: '10:00', CP1: 40, CP2: 50, CP3: 35 },
  { hour: '11:00', CP1: 50, CP2: 55, CP3: 40 },
  { hour: '12:00', CP1: 45, CP2: 50, CP3: 38 },
  { hour: '13:00', CP1: 40, CP2: 48, CP3: 35 },
  { hour: '14:00', CP1: 38, CP2: 46, CP3: 32 },
  { hour: '15:00', CP1: 35, CP2: 40, CP3: 30 },
  { hour: '16:00', CP1: 30, CP2: 38, CP3: 28 },
  { hour: '17:00', CP1: 28, CP2: 36, CP3: 26 },
  { hour: '18:00', CP1: 32, CP2: 40, CP3: 30 },
  { hour: '19:00', CP1: 35, CP2: 42, CP3: 33 },
  { hour: '20:00', CP1: 38, CP2: 44, CP3: 36 },
  { hour: '21:00', CP1: 40, CP2: 48, CP3: 38 },
  { hour: '22:00', CP1: 42, CP2: 50, CP3: 40 },
  { hour: '23:00', CP1: 45, CP2: 52, CP3: 42 },
];

const HourlyChargingChart: React.FC = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={hourlyChargingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            label={{ value: 'Hour', position: 'insideBottom', offset: -10 }}
          />
          <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CP1" stroke="#8884d8" />
          <Line type="monotone" dataKey="CP2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="CP3" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChargingChart;
