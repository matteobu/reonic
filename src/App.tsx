import React from 'react';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ChargePointBarChart from './components/output/dailyChart';
import ChargingInputForm from './components/input/inputForm';
import HourlyChargingChart from './components/output/hourlyChart';
import { useData } from './context/DataContext';

const App: React.FC = () => {
  const { activeComponents, isModalVisible, toggleModal } = useData();

  const renderActiveComponent = () => {
    if (activeComponents.c1) return <ChargePointBarChart />;
    if (activeComponents.c2) return <HourlyChargingChart />;
    return <div className="text-center">No active component</div>;
  };

  return (
    <div className="w-screen h-screen bg-white bg-center bg-no-repeat">
      <Header />
      <div className="flex h-[calc(100vh-52px)]">
        <Sidebar />
        {/* MAIN */}
        <div className="h-full flex flex-col transition-all duration-300 w-[97%]">
          {renderActiveComponent()}
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-8 rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <ChargingInputForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
