"use client";
import Image from "next/image";
import "./header.css";
import { ArrowLeft, Grid, Bell, Gift, Plus, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import leafImage from "../../../assets/images/leaf.svg";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

        <Image
          src="https://pub-static.fotor.com/static/web/lib/fotor-bundle/9d3a9d230faf9f901b16.svg"
          alt="logo" width={70} height={70}
        />

        <div className="searchBox" ref={dropdownRef}>
          <span className="menu" onClick={toggleDropdown}>
            Tools ▾
          </span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <i className="fa-solid fa-wrench"></i>
                Tools
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa-solid fa-users"></i>
                Community
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa-solid fa-layer-group"></i>
                Templates
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa-solid fa-book"></i>
                Library
              </a>
            </div>
          )}

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
        <Gift className="icon" size={ 20} />
        <div className="coin">
          <span className="leaf"> <Image src={leafImage} alt="coin" width={14} height={14} />
           6</span>
          <Plus size={14} className="plus" />
        </div>
        <div className="avatar"></div>
      </div>
    </header>
  );
}
