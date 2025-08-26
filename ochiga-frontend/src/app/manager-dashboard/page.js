// src/app/manager-dashboard/page.js

export default function ManagerDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Manager Dashboard
        </h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Residents</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending Payments</h2>
          <p className="text-2xl font-bold text-yellow-600">₦450,000</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Service Requests</h2>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>
      </section>

      {/* Tabs/Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payments */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Payments & Billing</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Resident A - Service Charge</span>
              <span className="text-green-600">Paid</span>
            </li>
            <li className="flex justify-between">
              <span>Resident B - Water Bill</span>
              <span className="text-red-600">Pending</span>
            </li>
          </ul>
        </div>

        {/* Access Control */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Access Control Logs</h2>
          <ul className="space-y-3">
            <li>Resident A entered at 08:45 AM</li>
            <li>Visitor (Guest of Resident B) entered at 09:30 AM</li>
            <li>Resident C exited at 10:15 AM</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
