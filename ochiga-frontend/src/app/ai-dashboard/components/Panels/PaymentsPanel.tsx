"use client";

export default function PaymentsPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-rose-300 font-semibold">💸 Payments</p>
      <div className="text-sm">Last payment: ₦0.00 • Next due: —</div>
    </div>
  );
}
