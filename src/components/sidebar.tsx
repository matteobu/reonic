import React from 'react';
import { FiEdit, FiZap, FiCalendar, FiClock, FiSettings } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const Sidebar: React.FC = () => {
  const { toggleModal, setActiveComponent } = useData();

  return (
    <div className="hidden md:flex flex-col justify-between items-center w-[3%] h-full bg-sideBar">
      <div className="mt-4">
        <FiEdit
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={toggleModal}
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
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
          onClick={() => setActiveComponent('c3')}
        />
      </div>
      <div className="mb-4">
        <FiSettings size={20} className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
