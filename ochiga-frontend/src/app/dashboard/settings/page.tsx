"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  const handleSave = () => {
    toast.success("Settings updated successfully!");
  };

  return (
    <motion.div
      className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-sm border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span>Enable Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        <div className="flex justify-between items-center">
          <span>Push Notifications</span>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Make Account Private</span>
          <Switch checked={privacy} onCheckedChange={setPrivacy} />
        </div>

        <Button className="mt-6" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </motion.div>
  );
}
