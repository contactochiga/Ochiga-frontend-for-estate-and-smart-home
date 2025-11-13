"use client";

import { FC } from "react";

interface Props {
  members?: string[];
  announcements?: string[];
}

const EstateCommunityPanel: FC<Props> = ({ members, announcements }) => {
  const defaultMembers = members || ["Alice", "Bob", "Charlie"];
  const defaultAnnouncements = announcements || ["Monthly meeting on 20th", "Pool maintenance tomorrow"];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md">
      <h3 className="text-white font-semibold mb-2">Estate Community</h3>

      <div className="mb-3">
        <h4 className="text-gray-300 font-medium mb-1">Members</h4>
        <ul className="text-gray-200 text-sm flex flex-col gap-1">
          {defaultMembers.map((m, i) => (
            <li key={i} className="bg-gray-700 px-2 py-1 rounded-md">
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-gray-300 font-medium mb-1">Announcements</h4>
        <ul className="text-gray-200 text-sm flex flex-col gap-1">
          {defaultAnnouncements.map((a, i) => (
            <li key={i} className="bg-gray-700 px-2 py-1 rounded-md">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EstateCommunityPanel;
