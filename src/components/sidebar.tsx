import React from 'react';
import { FiEdit, FiZap, FiCalendar, FiClock, FiSettings } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const Sidebar: React.FC = () => {
  const { toggleModal, setActiveComponent } = useData();

  return (
    <div
      className={`w-[3%] h-full bg-sideBar text-white transition-all duration-300 relative flex flex-col`}
    >
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <FiEdit
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={toggleModal}
        />
      </div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 space-y-4">
        <FiZap
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c1')}
        />
        <FiClock
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c2')}
        />
        <FiCalendar
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c5')}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <FiSettings size={20} className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
