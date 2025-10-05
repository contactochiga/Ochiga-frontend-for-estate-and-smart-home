"use client";

import { useParams } from "next/navigation";

export default function HouseDetailsPage() {
  const params = useParams<{ houseId: string }>(); // ✅ strongly typed
  const houseId = params.houseId;

  // Mock data (later replace with API)
  const houseData: Record<string, any> = {
    "1A": {
      owner: "John Doe",
      phoneNumber: "0803-123-4567",
      email: "john@example.com",
      rentStatus: "Paid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E12345678",
      waterMeter: "W98765432",
      balance: 0,
    },
    "2B": {
      owner: "Jane Smith",
      phoneNumber: "0812-987-6543",
      email: "jane@example.com",
      rentStatus: "Unpaid",
      serviceChargeStatus: "Paid",
      electricityMeter: "E87654321",
      waterMeter: "W12345678",
      balance: 75000,
    },
    "3C": {
      owner: "Chika Obi",
      phoneNumber: "0701-234-5678",
      email: "chika@example.com",
      rentStatus: "Pending",
      serviceChargeStatus: "Unpaid",
      electricityMeter: "E55566677",
      waterMeter: "W33344455",
      balance: 25000,
    },
  };

  const house = houseData[houseId];

  if (!house) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        ❌ House not found
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        House {houseId}
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium">Owner:</span> {house.owner}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {house.phoneNumber}
        </p>
        <p>
          <span className="font-medium">Email:</span> {house.email}
        </p>
        <p>
          <span className="font-medium">Rent:</span> {house.rentStatus}
        </p>
        <p>
          <span className="font-medium">Service Charge:</span>{" "}
          {house.serviceChargeStatus}
        </p>
        <p>
          <span className="font-medium">Electricity Meter:</span>{" "}
          {house.electricityMeter}
        </p>
        <p>
          <span className="font-medium">Water Meter:</span>{" "}
          {house.waterMeter}
        </p>
        <p>
          <span className="font-medium">Outstanding Balance:</span>{" "}
          ₦{house.balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
