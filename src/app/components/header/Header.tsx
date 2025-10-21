"use client";
import Image from "next/image";
import "./header.css";
import { ArrowLeft, Grid, Bell, Gift, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="unit-header">
      {/* LEFT */}
      <div className="left">
        <button className="backBtn">
          <ArrowLeft size={18} />
        </button>

        <Image src="/logo.png" alt="logo" width={28} height={28} />

        <div className="searchBox">
          <span className="menu">Tools ▾</span>
          <input
            type="text"
            placeholder="Search"
            className="searchInput"
          />
          <span className="shortcut">Ctrl+K</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <button className="promoBtn">
          💎 Up to <strong>30%</strong> Off
        </button>
        <Grid className="icon" size={20} />
        <Bell className="icon" size={20} />
        <Gift className="icon" size={20} />
        <div className="coin">
          <span>6</span>
          <Plus size={14} className="plus" />
        </div>
        <div className="avatar"></div>
      </div>
    </header>
  );
}
