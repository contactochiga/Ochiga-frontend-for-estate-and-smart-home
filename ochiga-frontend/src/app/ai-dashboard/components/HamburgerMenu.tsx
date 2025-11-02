"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCog, FaSignOutAlt } from "react-icons/fa";

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Fake suggestions for demo
  useEffect(() => {
    if (search.length > 1) {
      setSuggestions(["Building 1", "Estate A", "Device Z"]);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const menuButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: "#333",
    color: "#fff",
    border: "none",
    outline: "none",
    marginBottom: "0.5rem",
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.25s",
  };

  const dropdownButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "none",
    border: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "left",
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 1100,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Slide Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-92%",
          width: "92%",
          height: "100%",
          background: "#1a1a1a",
          transition: "left 0.35s ease",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          zIndex: 1000,
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search buildings, estates, devices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "1rem",
            border: "none",
            marginBottom: "0.5rem",
            background: "#333",
            color: "#fff",
          }}
        />

        {suggestions.length > 0 && (
          <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "1rem" }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  background: "#222",
                  marginBottom: "0.25rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0f62fe")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
                onClick={() => {
                  setSearch(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Menu Buttons */}
        <div style={{ flex: 1 }}>
          <button
            style={menuButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f62fe")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
          >
            Buildings
          </button>
          <button
            style={menuButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f62fe")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
          >
            Estates
          </button>
        </div>

        {/* Profile at bottom */}
        <div style={{ marginTop: "auto", position: "relative" }}>
          <button
            style={{ ...menuButtonStyle, display: "flex", alignItems: "center" }}
            onClick={() => setProfileOpen(!profileOpen)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f62fe")}
            onMouseLeave={(e) => !profileOpen && (e.currentTarget.style.background = "#333")}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#0f62fe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "0.5rem",
                fontWeight: "bold",
              }}
            >
              AI
            </div>
            Profile
          </button>

          {profileOpen && (
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: 0,
                width: "100%",
                background: "#222",
                borderRadius: "0.75rem",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                zIndex: 1001,
              }}
            >
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #333" }}>
                <div style={{ fontWeight: "bold" }}>John Doe</div>
                <div style={{ fontSize: "0.85rem", color: "#aaa" }}>john@example.com</div>
              </div>
              <button style={dropdownButtonStyle}>
                <FaCog style={{ marginRight: "0.5rem" }} /> Settings
              </button>
              <button style={dropdownButtonStyle}>
                <FaSignOutAlt style={{ marginRight: "0.5rem" }} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
