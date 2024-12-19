import React from 'react';
import { useTranslation } from 'react-i18next';
import { SummaryBoxGridProps } from '../../interfaces';

const SummaryBoxGrid: React.FC<SummaryBoxGridProps> = ({ summaryData }) => {
  const { t } = useTranslation();
  const rows = [summaryData.slice(0, 6), summaryData.slice(6, 12)];

  return (
    <div className="mt-6">
      <h3 className="text-center text-lg font-semibold mb-6">
        {t('summaryBoxGrid.title')}
      </h3>

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 ${
            rowIndex > 0 ? 'mt-6' : ''
          }`}
        >
          {row.map((summary, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center justify-center text-center"
            >
              <h4 className="text-blue-600 font-semibold text-sm">
                {summary.title}
              </h4>
              {summary.energy && (
                <p className="text-gray-700 text-xs mt-2">
                  <span className="block font-bold text-md">
                    {summary.energy}
                  </span>
                  {t('summaryBoxGrid.energy')}
                </p>
              )}
              {summary.events && (
                <p className="text-gray-700 text-xs mt-1">
                  <span className="block font-bold text-md">
                    {summary.events}
                  </span>
                  {t('summaryBoxGrid.events')}
                </p>
              )}
              {summary.extraContent && (
                <p className="text-gray-500 text-xs mt-1">
                  {summary.extraContent}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SummaryBoxGrid;
