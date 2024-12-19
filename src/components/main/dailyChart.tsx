import React, { useEffect, useState } from 'react';
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
import {
  ChargePointData,
  DailyDataKeys,
} from '../../interfaces/outputs.interfaces';
import chargePointData from '../../mocks/mock_data.json';
import ComponentHeader from './navBar';
import { useData } from '../../context/DataContext';
import { getRandomArray } from '../../utils/utils';
import TotalEnergyChart from './totalEnergyChart';
import { useTranslation } from 'react-i18next';

const DailyChart: React.FC = () => {
  const { t } = useTranslation();
  const { chargePoints } = useData();
  const mockedData: ChargePointData[] = chargePointData;
  const [modifiedData, setModifiedData] = useState<ChargePointData[]>(
    chargePoints < 20 ? getRandomArray(mockedData, chargePoints) : mockedData
  );
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-01');
  const [barChartData, setBarChartData] = useState<
    { id: string; ABS: number; FLOATING: number; BULK: number }[]
  >([]);
  const [dailyData, setDailyData] = useState<ChargePointData[]>([]);
  const [cpData, setCpData] = useState<ChargePointData | undefined>(undefined);

  useEffect(() => {
    const newModifiedData =
      chargePoints < 20 ? getRandomArray(mockedData, chargePoints) : mockedData;

    setModifiedData(newModifiedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargePoints]);

  useEffect(() => {
    if (!modifiedData.length) return;

    const filteredByDay = modifiedData.map((cp) => {
      const dayData = cp.dailyData.find((data) => data.day === selectedDate);
      return { ...cp, dailyData: dayData ? [dayData] : [] };
    });

    const barData = filteredByDay.map((data) => ({
      id: data.id,
      ABS: data.dailyData[0]?.ABS || 0,
      FLOATING: data.dailyData[0]?.FLOATING || 0,
      BULK: data.dailyData[0]?.BULK || 0,
    }));

    const selectedCPData = filteredByDay.find(
      (cp) => cp.id === modifiedData[0]?.id
    );

    setDailyData(filteredByDay);
    setBarChartData(barData);
    setCpData(selectedCPData);
  }, [modifiedData, selectedDate]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const validDailyDataKeys: DailyDataKeys[] = ['BULK', 'FLOATING', 'ABS'];
  return (
    <div className="flex flex-col w-full h-full ">
      <ComponentHeader
        name={t('dailyChart.title')}
        shortName={t('dailyChart.short')} 
        onDateChange={handleDateChange}
        isOnDateChange={true}
      />
      <div className="w-[98%] p-4 m-2 bg-gray-100 rounded-lg shadow-md border border-gray-200 h-[45vh] ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis
              label={{
                value: t('dailyChart.yAxisLabel'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="BULK" stackId="a" fill="#9AA6B2" />
            <Bar dataKey="FLOATING" stackId="a" fill="#789DBC" />
            <Bar dataKey="ABS" stackId="a" fill="#A2D2DF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col m-2 md:flex-row w-[99%] mt-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-center font-semibold mb-2 border-b border-gray-300">
            {t('dailyChart.aggregateMetrics')}
          </h3>
          {cpData && (
            <div className="space-y-2">
              {(Object.keys(cpData.dailyData[0] || {}) as DailyDataKeys[]).map(
                (key) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">
                      {t(`dailyChart.total${key}`)}
                    </span>
                    <span className="font-semibold">
                      {validDailyDataKeys.includes(key as DailyDataKeys)
                        ? `${cpData.dailyData[0]?.[key] || 0} kWh`
                        : cpData.dailyData[0]?.[key] || 0}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <TotalEnergyChart
            selectedDate={selectedDate}
            filteredData={dailyData}
          />
        </div>
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-center font-semibold mb-4 border-b border-gray-300">
            {t('dailyChart.errorLogs')}
          </h3>
          <div className="max-h-[230px] overflow-y-auto space-y-2">
            {dailyData
              .filter((cp) => cp.errors > 0)
              .map((cp) => (
                <div
                  key={cp.id}
                  className="p-2 bg-red-100 rounded text-red-800"
                >
                  {t('dailyChart.errorMessage', {
                    id: cp.id,
                    errors: cp.errors,
                  })}{' '}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChart;
