"use client";

import HouseCard from "../components/HouseCard";

export default function HousesPage() {
  const houses = [
    { houseNumber: "1A", owner: "John Doe", status: "Paid", balance: 0 },
    { houseNumber: "2B", owner: "Jane Smith", status: "Unpaid", balance: 75000 },
    { houseNumber: "3C", owner: "Chika Obi", status: "Pending", balance: 25000 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {houses.map((house, idx) => (
        <HouseCard
          key={idx}
          houseNumber={house.houseNumber}
          owner={house.owner}
          status={house.status as "Paid" | "Unpaid" | "Pending"}
          balance={house.balance}
        />
      ))}
    </div>
  );
}
