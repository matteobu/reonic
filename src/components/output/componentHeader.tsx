import React, { useState, useEffect } from 'react';
import { ComponentHeaderProps } from '../../interfaces';

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  name,
  onDateChange,
  isOnDateChange,
  children,
}) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedDay, setSelectedDay] = useState('01');

  useEffect(() => {
    const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    onDateChange(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };

  return (
    <header className="bg-white px-4 py-2 shadow-md h-10 flex items-center justify-between">
      <h1 className="text-sm font-semibold text-gray-700 hidden md:block">
        {name}
      </h1>
      <h1 className="text-sm font-semibold text-gray-700 block md:hidden">
        {'test'}
      </h1>
      {isOnDateChange && (
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 items-center">
            {children && <div className="flex items-center">{children}</div>}

            {/* Day Picker */}
            <select
              value={selectedDay}
              onChange={handleDayChange}
              className="bg-gray-50 text-sm px-3 h-7 rounded-md border border-gray-300 shadow focus:outline-none appearance-none"
            >
              {Array.from({ length: 31 }, (_, index) => (
                <option
                  key={index}
                  value={(index + 1).toString().padStart(2, '0')}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </option>
              ))}
            </select>

            {/* Month Picker */}
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="bg-gray-50 text-sm px-3 h-7 rounded-md border border-gray-300 shadow focus:outline-none appearance-none"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option
                  key={index}
                  value={(index + 1).toString().padStart(2, '0')}
                >
                  {new Date(0, index).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>

            {/* Year Picker */}
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-gray-50 text-sm px-3 h-7 rounded-md border border-gray-300 shadow focus:outline-none appearance-none"
            >
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default ComponentHeader;
