import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppData {
  chargePoints: number;
  arrivalProbability: number;
  carConsumption: number;
  chargingPower: number;
}

interface DataContextProps {
  data: AppData | null;
  setData: (data: AppData) => void;
  isModalVisible: boolean;
  toggleModal: () => void;
  activeComponents: { [key: string]: boolean };
  setActiveComponent: (key: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<AppData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeComponents, setActiveComponents] = useState({
    c1: true,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
  });

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const setActiveComponent = (key: string) => {
    setActiveComponents((prev) =>
      Object.keys(prev).reduce(
        (acc, curr) => {
          acc[curr as keyof typeof prev] = curr === key;
          return acc;
        },
        { ...prev }
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        data,
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
