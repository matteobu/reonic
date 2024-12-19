import React from 'react';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import DailyChargingChart from './components/main/dailyChart';
import HourlyChargingChart from './components/main/hourlyChart';
import ChargingInputForm from './components/modals/InputFormModal';
import { useData } from './context/DataContext';
import HeatmapChart from './components/main/consumptionTable';
import SidebarHorizontal from './components/sidebarHorizontal';

const App: React.FC = () => {
  const { activeComponents, isModalVisible, toggleModal } = useData();

  const renderActiveComponent = () => {
    const activeKey = (Object.keys(activeComponents) as ComponentKey[]).find(
      (key) => activeComponents[key]
    );

    return activeKey ? (
      componentMap[activeKey]
    ) : (
      <div className="text-center p-4">No active component</div>
    );
  };

  return (
    <div className="w-screen h-screen bg-white bg-center bg-no-repeat">
      <Header />
      {/* MAIN AREA */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-52px)]">
        <Sidebar />
        <div className="flex md:hidden w-full h-[4%] bg-sideBar">
          <SidebarHorizontal />
        </div>
        <div className="flex-1 bg-gray-100">{renderActiveComponent()}</div>
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

const componentMap = {
  c1: <DailyChargingChart />,
  c2: <HourlyChargingChart />,
  c3: <HeatmapChart />,
};

type ComponentKey = keyof typeof componentMap;
