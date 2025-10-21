"use client";
import Image from "next/image";
import "./header.css";
import { ArrowLeft, Grid, Bell, Gift, Plus, Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header className="unit-header">
      {/* LEFT */}
      <div className="left">
        {isMobile && (
          <button className="backBtn mobile-menu-btn" onClick={toggleSidebar}>
            <Menu size={18} />
          </button>
        )}

        {!isMobile && (
          <button className="backBtn desktop-back-btn">
            <ArrowLeft size={18} />
          </button>
        )}

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
