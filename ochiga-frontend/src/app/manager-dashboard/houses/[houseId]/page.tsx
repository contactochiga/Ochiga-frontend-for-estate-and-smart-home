"use client";

import { useParams } from "next/navigation";
import HouseCard from "@/app/components/HouseCard";

export default function HouseDetailsPage() {
  const params = useParams<{ houseId: string }>();
  const houseId = params?.houseId ?? "";

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
    return <p className="p-6 text-red-500">House not found</p>;
  }

  // Determine overall status — e.g., Paid if both paid, otherwise Unpaid
  const overallStatus =
    house.rentStatus === "Paid" && house.serviceChargeStatus === "Paid"
      ? "Paid"
      : "Unpaid";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        House {houseId}
      </h1>

      {/* Use HouseCard */}
      <HouseCard
        houseNumber={houseId}
        owner={house.owner}
        status={overallStatus}
        balance={house.balance}
        phoneNumber={house.phoneNumber}
        email={house.email}
      />

      {/* Extra Info */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p>
          <span className="font-medium">Rent Status:</span> {house.rentStatus}
        </p>
        <p>
          <span className="font-medium">Service Charge Status:</span>{" "}
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
          <span className="font-medium">Outstanding Balance:</span> ₦
          {house.balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/**
 * ✅ Fix for static export builds
 * This ensures Next.js knows which dynamic paths exist.
 * Safe to include — no effect on runtime logic.
 */
export async function generateStaticParams() {
  // Predefine example static paths for export
  return [{ houseId: "1A" }, { houseId: "2B" }, { houseId: "3C" }];
}
