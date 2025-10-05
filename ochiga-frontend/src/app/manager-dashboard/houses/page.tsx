"use client";

import React from "react";
import HouseCard from "@/app/components/HouseCard";

export default function HousesPage() {
  // Mock house data (replace with API later)
  const houses = [
    {
      id: "1A",
      owner: "John Doe",
      phoneNumber: "0803-123-4567",
      email: "john@example.com",
      rentStatus: "Paid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E12345678",
      waterMeter: "W98765432",
      balance: 0,
    },
    {
      id: "2B",
      owner: "Jane Smith",
      phoneNumber: "0812-987-6543",
      email: "jane@example.com",
      rentStatus: "Unpaid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E87654321",
      waterMeter: "W12345678",
      balance: 75000,
    },
    {
      id: "3C",
      owner: "Chika Obi",
      phoneNumber: "0701-234-5678",
      email: "chika@example.com",
      rentStatus: "Pending",
      serviceChargeStatus: "Unpaid",
      electricityMeter: "E55566677",
      waterMeter: "W33344455",
      balance: 25000,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Estate Houses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => {
          // Compute overall status
          const status =
            house.rentStatus === "Paid" && house.serviceChargeStatus === "Paid"
              ? "Paid"
              : house.rentStatus === "Pending" ||
                house.serviceChargeStatus === "Pending"
              ? "Pending"
              : "Unpaid";

          return (
            <HouseCard
              key={house.id}
              houseNumber={house.id}
              owner={house.owner}
              status={status}
              balance={house.balance}
              phoneNumber={house.phoneNumber}
              email={house.email}
            />
          );
        })}
      </div>
    </div>
  );
}
