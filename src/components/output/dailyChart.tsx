import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { ChargePointData, CustomLabelProps } from '../../utils/interfaces';

const CustomLabel: React.FC<CustomLabelProps> = ({
  x,
  y,
  width,
  yieldValue,
  pMax,
  errors,
}) => {
  return (
    <g transform={`translate(${x},${y + 20})`}>
      <text x={width / 2} textAnchor="middle" fontSize="12" fill="#333">
        Yield: {yieldValue}
      </text>
      <text x={width / 2} y={15} textAnchor="middle" fontSize="12" fill="#333">
        P max: {pMax}
      </text>
      <text x={width / 2} y={30} textAnchor="middle" fontSize="12" fill="#f00">
        Errors: {errors}
      </text>
    </g>
  );
};

const DailyChargingChart: React.FC = () => {
  const { data } = useData();

  // Handle no data
  if (!data) {
    return (
      <div className="text-center text-gray-700">
        No data available. Submit the form first.
      </div>
    );
  }

  // Mocked data transformation
  const transformedData: ChargePointData[] = Array.from(
    { length: data.chargePoints },
    (_, i) => ({
      chargePoint: `CP${i + 1}`,
      BULK: Math.floor(Math.random() * 40 + 10),
      FLOATING: Math.floor(Math.random() * 30 + 5),
      ABS: Math.floor(Math.random() * 20 + 5),
      yield: Number((data.carConsumption * (Math.random() + 0.5)).toFixed(2)),
      pMax: data.chargingPower,
      errors: Math.floor(Math.random() * 3),
    })
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="chargePoint" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="BULK" stackId="a" fill="#9AA6B2" />
        <Bar dataKey="FLOATING" stackId="a" fill="#BCCCDC" />
        <Bar dataKey="ABS" stackId="a" fill="#D9EAFD">
          <LabelList
            dataKey="chargePoint"
            content={({ x = 0, y = 0, width = 0, index }) => (
              <CustomLabel
                x={Number(x)}
                y={Number(y)}
                width={Number(width)}
                chargePoint={transformedData[index ?? 0].chargePoint}
                yieldValue={transformedData[index ?? 0].yield}
                pMax={transformedData[index ?? 0].pMax}
                errors={transformedData[index ?? 0].errors}
              />
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyChargingChart;
