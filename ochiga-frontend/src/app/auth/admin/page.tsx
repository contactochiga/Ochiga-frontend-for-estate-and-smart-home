"use client";

import { useState } from "react";
import QRPreview from "../components/QRPreview";
import { v4 as uuidv4 } from "uuid";

export default function AdminInvitesPage(){
  const [homeName, setHomeName] = useState("");
  const [estateId, setEstateId] = useState("");
  const [tokenLink, setTokenLink] = useState<string|null>(null);

  const createHomeInvite = async () => {
    if (!homeName || !estateId) return alert("fill estateId and homeName");
    const token = uuidv4();
    const invite = { token, type: "homeInvite", meta: { homeName, estateId }, used: false, createdAt: Date.now() };
    const invites = JSON.parse(localStorage.getItem("ochiga_invites") || "[]");
    invites.push(invite);
    localStorage.setItem("ochiga_invites", JSON.stringify(invites));
    const link = `${location.origin}/auth/onboard?token=${token}`;
    setTokenLink(link);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <div className="max-w-xl mx-auto bg-gray-900 p-5 rounded border border-gray-800">
        <h2 className="text-lg font-semibold mb-3">Admin / Create Home Invite (Demo)</h2>
        <input value={estateId} onChange={(e)=>setEstateId(e.target.value)} placeholder="estate id (e.g. estate_...)" className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-3" />
        <input value={homeName} onChange={(e)=>setHomeName(e.target.value)} placeholder="home name (e.g. 2B Flat)" className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-3" />
        <div className="flex gap-2">
          <button onClick={createHomeInvite} className="py-2 px-3 bg-emerald-600 rounded">Create Invite</button>
          <button onClick={()=>{ navigator.clipboard.writeText(tokenLink || ""); alert("copied") }} className="py-2 px-3 bg-gray-800 rounded">Copy Link</button>
        </div>

        {tokenLink && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Invite link:</p>
            <a className="break-all text-emerald-300" href={tokenLink}>{tokenLink}</a>
            <div className="mt-3"><QRPreview text={tokenLink} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
