// ochiga-frontend/src/app/components/Footer.tsx
import React from "react";
import {
  HiOutlineHome,
  HiOutlineBuildingOffice,
  HiOutlineDevicePhoneMobile,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md">
      <nav className="flex justify-around items-center h-14">
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <HiOutlineHome size={22} />
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <HiOutlineBuildingOffice size={22} />
          <span className="text-[10px]">Room</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <HiOutlineDevicePhoneMobile size={22} />
          <span className="text-[10px]">Estate</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <HiOutlineCog6Tooth size={22} />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
