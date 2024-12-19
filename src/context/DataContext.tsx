import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DataContextProps } from '../interfaces';

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chargePoints, setChargePoints] = useState<number>(20);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeComponents, setActiveComponents] = useState({
    c1: true,
    c2: false,
    c3: false,
  });

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  // Wrapper for setData to update the entire AppData object
  const setData = (newData: number) => {
    setChargePoints(newData);
  };

  const setActiveComponent = (key: keyof typeof activeComponents) => {
    setActiveComponents({
      c1: key === 'c1',
      c2: key === 'c2',
      c3: key === 'c3',
    });
  };

  return (
    <DataContext.Provider
      value={{
        chargePoints,
        setData,
        isModalVisible,
        toggleModal,
        activeComponents,
        setActiveComponent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
