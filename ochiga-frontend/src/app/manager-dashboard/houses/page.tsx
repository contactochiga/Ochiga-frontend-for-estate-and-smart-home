"use client";

import Link from "next/link";
import HouseCard from "../../components/HouseCard";
import { PlusIcon } from "@heroicons/react/24/solid";

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
    <div className="p-6">
      {/* Header with Add House button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Houses
        </h1>
        <Link
          href="/manager-dashboard/houses/add"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          <PlusIcon className="w-4 h-4" />
          Add House
        </Link>
      </div>

      {/* Houses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house, idx) => (
          <Link
            key={idx}
            href={`/manager-dashboard/houses/${house.houseNumber}`}
          >
            <HouseCard
              houseNumber={house.houseNumber}
              owner={house.owner}
              status={house.status as "Paid" | "Unpaid" | "Pending"}
              balance={house.balance}
              phoneNumber={house.phoneNumber}
              email={house.email}
              rentStatus={house.rentStatus as "Paid" | "Unpaid" | "Pending"}
              serviceChargeStatus={
                house.serviceChargeStatus as "Paid" | "Unpaid" | "Pending"
              }
              electricityMeter={house.electricityMeter}
              waterMeter={house.waterMeter}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
