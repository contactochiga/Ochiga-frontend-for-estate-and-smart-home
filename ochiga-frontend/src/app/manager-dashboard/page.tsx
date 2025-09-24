"use client";

import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import HouseCard from "../components/HouseCard";

export default function HousesPage() {
  const houses = [
    {
      houseNumber: "1A",
      owner: "John Doe",
      status: "Paid",
      balance: 0,
      phoneNumber: "0803-123-4567",
      email: "john@example.com",
      rentStatus: "Paid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E12345678",
      waterMeter: "W98765432",
    },
    {
      houseNumber: "2B",
      owner: "Jane Smith",
      status: "Unpaid",
      balance: 75000,
      phoneNumber: "0812-987-6543",
      email: "jane@example.com",
      rentStatus: "Unpaid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E87654321",
      waterMeter: "W12345678",
    },
    {
      houseNumber: "3C",
      owner: "Chika Obi",
      status: "Pending",
      balance: 25000,
      phoneNumber: "0701-234-5678",
      email: "chika@example.com",
      rentStatus: "Pending",
      serviceChargeStatus: "Unpaid",
      electricityMeter: "E55566677",
      waterMeter: "W33344455",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Sub-header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Houses
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 mr-1" />
            Add House
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <PencilSquareIcon className="w-5 h-5 mr-1" />
            Edit Details
          </button>
        </div>
      </div>

      {/* Grid of Houses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house, idx) => (
          <HouseCard
            key={idx}
            houseNumber={house.houseNumber}
            owner={house.owner}
            status={house.status as "Paid" | "Unpaid" | "Pending"}
            balance={house.balance}
            phoneNumber={house.phoneNumber}
            email={house.email}
            rentStatus={house.rentStatus as "Paid" | "Unpaid" | "Pending"}
            serviceChargeStatus={house.serviceChargeStatus as "Paid" | "Unpaid" | "Pending"}
            electricityMeter={house.electricityMeter}
            waterMeter={house.waterMeter}
          />
        ))}
      </div>
    </div>
  );
}
