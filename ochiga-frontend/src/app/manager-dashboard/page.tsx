"use client";

import HouseCard from "../components/HouseCard";

export default function HousesPage() {
  const houses = [
    {
      houseId: "B1",
      type: "3-Bedroom Duplex",
      block: "Block B",
      status: "Occupied" as const,
      resident: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+234 801 234 5678",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      balance: 45000,
      lastPayment: "Sept 10, 2025",
      qrCodeUrl: "/qrcode/b1.png",
    },
    {
      houseId: "A2",
      type: "2-Bedroom Flat",
      block: "Block A",
      status: "Vacant" as const,
      balance: 0,
      lastPayment: undefined,
      qrCodeUrl: "/qrcode/a2.png",
    },
    {
      houseId: "C3",
      type: "4-Bedroom Terrace",
      block: "Block C",
      status: "Occupied" as const,
      resident: {
        name: "Mary Smith",
        email: "mary@example.com",
        phone: "+234 805 678 1234",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      balance: 120000,
      lastPayment: "Aug 25, 2025",
      qrCodeUrl: "/qrcode/c3.png",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Estate Houses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <HouseCard key={house.houseId} {...house} />
        ))}
      </div>
    </div>
  );
}
