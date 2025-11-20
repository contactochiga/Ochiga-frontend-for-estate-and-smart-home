"use client";

import { useEffect, useState } from "react";
import { FaUserPlus, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { residentsService } from "../../services/residentsService";

type Resident = {
  id: string;
  email: string;
  username?: string | null;
  role?: string;
  estate_id?: string | null;
  home_id?: string | null;
  created_at?: string;
};

export default function ResidentManagementPanel() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await residentsService.list();
      setResidents(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load residents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setError("");
    if (!newEmail) return setError("Email required");
    setCreating(true);
    try {
      const res = await residentsService.invite({ email: newEmail });
      // optimistic insertion
      setResidents((p) => [res, ...p]);
      setNewEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to invite");
    } finally {
      setCreating(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Remove resident?")) return;
    try {
      await residentsService.remove(id);
      setResidents((p) => p.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to remove");
    }
  };

  const filtered = query ? residents.filter(r => (r.email + r.username).toLowerCase().includes(query.toLowerCase())) : residents;

  return (
    <div className="p-3 bg-gray-900 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Residents & Homes</h3>
        <div className="flex items-center gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="search resident" className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-sm" />
          <button className="px-3 py-1 bg-green-700 rounded" onClick={load}><FaSearch /></button>
        </div>
      </div>

      <div className="my-3 flex gap-2">
        <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="resident email" className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"/>
        <button onClick={handleCreate} disabled={creating} className={`px-4 py-2 rounded ${creating ? "bg-gray-700" : "bg-blue-600"}`}>
          <FaUserPlus className="inline mr-2" /> {creating ? "Inviting..." : "Invite"}
        </button>
      </div>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <div className="space-y-2 max-h-64 overflow-auto pr-2">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No residents</p>
        ) : (
          filtered.map(r => (
            <div key={r.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div>
                <div className="text-sm text-white">{r.email} {r.username ? <span className="text-gray-400">({r.username})</span> : null}</div>
                <div className="text-[11px] text-gray-400">{r.role || "resident"} • {r.home_id || "No home"}</div>
              </div>
              <div className="flex items-center gap-2">
                <button title="Edit" className="p-1"><FaEdit /></button>
                <button title="Remove" onClick={() => handleRemove(r.id)} className="p-1 text-red-400"><FaTrash /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
