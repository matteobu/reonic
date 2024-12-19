import React from 'react';
import { FiEdit, FiZap, FiCalendar, FiClock, FiSettings } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const SidebarHorizontal: React.FC = () => {
  const { toggleModal, setActiveComponent } = useData();

  return (
    <div className="w-full bg-sideBar text-white transition-all duration-300 relative flex flex-row items-center justify-around">
      <FiEdit
        size={15}
        className="text-gray-500 cursor-pointer"
        onClick={toggleModal}
      />

      {/* Main Navigation Icons */}
      <div className="flex flex-row space-x-6">
        <FiZap
          size={15}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c1')}
        />
        <FiClock
          size={15}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c2')}
        />
        <FiCalendar
          size={15}
          className="text-gray-500 cursor-pointer"
          onClick={() => setActiveComponent('c3')}
        />
      </div>

      {/* Settings Icon */}
      <FiSettings size={15} className="text-gray-500 cursor-pointer" />
    </div>
  );
};

export default SidebarHorizontal;
