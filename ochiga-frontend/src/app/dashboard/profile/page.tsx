"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("resident@email.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [avatar, setAvatar] = useState("/default-avatar.png");

  const handleUpdate = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div
      className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-sm border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Resident Profile</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <Image
          src={avatar}
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full object-cover border"
        />
        <Button variant="outline">Change Photo</Button>
      </div>

      <div className="grid gap-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />

        <Button className="mt-4" onClick={handleUpdate}>
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
}
