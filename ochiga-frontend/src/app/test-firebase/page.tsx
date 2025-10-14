"use client";
import { useEffect } from "react";
import { app } from "@/lib/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function TestFirebase() {
  useEffect(() => {
    const db = getFirestore(app);
    addDoc(collection(db, "testCollection"), {
      message: "Hello from Ochiga!",
      timestamp: new Date(),
    }).then(() => {
      console.log("✅ Firestore write successful!");
    });
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Firestore Test</h1>
      <p>Check console + Firebase Firestore → testCollection</p>
    </div>
  );
}
