import React, { useRef } from 'react';
import chargePointData from '../../mocks/mock_data.json';
import {
  aggregateDailyData,
  calculateAllSummaries,
  getColor,
} from '../../utils/utils';
import ComponentHeader from './navBar';
import SummaryBoxGrid from './summaryGridBox';
import { useTranslation } from 'react-i18next';

const ConsumptionTable: React.FC = () => {
  const { t } = useTranslation();
  const mockedData = chargePointData;
  const aggregatedDailyEnergyEvents = aggregateDailyData(mockedData);
  const summaryData = calculateAllSummaries(aggregatedDailyEnergyEvents);

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    content: string
  ) => {
    if (tooltipRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      tooltipRef.current.style.top = `${rect.top - 10}px`;
      tooltipRef.current.style.left = `${rect.left + rect.width / 2}px`;
      tooltipRef.current.textContent = content;
      tooltipRef.current.style.display = 'block';
    }
  };

  const handleMouseLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  };

  const handleDateChange = (newDate: string) => {
    // eventually implement date change
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ComponentHeader
        name={t('componentHeader.name')} 
        onDateChange={handleDateChange}
        isOnDateChange={false}
      />

      <div className="h-full bg-gray-100 p-4 m-2 shadow-md border border-gray-300 rounded-lg flex flex-col relative">
        <h3 className="text-center text-md font-medium mb-2">
          {t('consumptionTable.totalEnergy')} 
        </h3>
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
                  `${t('consumptionTable.tooltipDay')}: ${entry.day}\n${t(
                    'consumptionTable.tooltipEnergy'
                  )}: ${entry.totalEnergy} kWh`
                )
              }
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
        <h3 className="text-center text-md font-medium mb-2">
          {t('consumptionTable.totalEvents')} 
        </h3>
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
                  `${t('consumptionTable.tooltipDay')}: ${entry.day}\n${t(
                    'consumptionTable.tooltipEvents'
                  )}: ${entry.totalEvents}`
                )
              }
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
        <div
          ref={tooltipRef}
          className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none"
          style={{
            display: 'none',
            transform: 'translate(-50%, -110%)',
            whiteSpace: 'pre-line',
          }}
        ></div>
        <SummaryBoxGrid summaryData={summaryData} />
      </div>
    </div>
  );
};

export default ConsumptionTable;
