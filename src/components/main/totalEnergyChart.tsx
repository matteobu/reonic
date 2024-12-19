import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TotalEnergyChartProps } from '../../interfaces/outputs.interfaces';
import { TOTAL_ENERGY_PIE_COLORS as COLORS } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const TotalEnergyChart: React.FC<TotalEnergyChartProps> = ({
  selectedDate,
  filteredData,
}) => {
  const { t } = useTranslation();

  const pieChartData = filteredData.map((data) => ({
    id: data.id,
    totalEnergy: data.dailyData[0]?.totalEnergy || 0,
  }));

  return (
    <>
      <h2 className="text-center text-lg font-semibold mb-4 border-b border-gray-300">
        {t('totalEnergyChart.title', { selectedDate })}
      </h2>

      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="totalEnergy"
              nameKey="id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {filteredData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} kWh`,
                `${t('totalEnergyChart.pieTooltip', { id: name })}`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          {t('totalEnergyChart.noData')}
        </div>
      )}
    </>
  );
};

export default TotalEnergyChart;
