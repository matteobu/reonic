import React from 'react';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import DailyChargingChart from './components/output/dailyChart';
import HourlyChargingChart from './components/output/hourlyChart';
import ChargingInputForm from './components/input/inputForm';
import { useData } from './context/DataContext';
import HeatmapChart from './components/output/heatMapChart';

const App: React.FC = () => {
  const { activeComponents, isModalVisible, toggleModal } = useData();

  // Dynamically render active component
  const renderActiveComponent = () => {
    if (activeComponents.c1) return <DailyChargingChart />;
    if (activeComponents.c2) return <HourlyChargingChart />;
    if (activeComponents.c5) return <HeatmapChart />;
    return <div className="text-center p-4">No active component</div>;
  };

  return (
    <div className="w-screen h-screen bg-white bg-center bg-no-repeat">
      <Header />
      {/* MAIN AREA */}
      <div className="flex h-[calc(100vh-52px)]">
        <Sidebar />
        <div className="h-full w-[97%] bg-gray-100 p-0">
          {renderActiveComponent()}
        </div>
      </div>

      {/* INPUT MODAL */}
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="rounded shadow-lg relative w-[400px]"
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
