'use client';

import Image from "next/image";
import "./Sidebar.css";
interface SidebarItem {
  name: string;
  icon: string;
  active: boolean;
  badge?: string;
}

interface SettingsItem {
  name: string;
  icon: string;
  toggle?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = () => {
  const sidebarItems: SidebarItem[] = [
    { name: 'Explore', icon: 'fa-light fa-house', active: false },
    { name: 'Create', icon: 'fa-light fa-arrows-rotate', active: false },
    { name: 'Models', icon: 'fa-light fa-robot', active: false },
    { name: 'API Apps', icon: 'fa-solid fa-rocket', active: false },
  ];

  const settingsItems: SettingsItem[] = [
    { name: '', icon: 'fa-light fa-gift' },
    { name: '', icon: 'fa-light fa-bell' },
    { name: '', icon: 'fa-light fa-table-cells-large' },
  ];

  return (
    <div className={`sidebar  `}>

      <div className="sidebar-content-main">
        <div className="sidebar-logo">
          <Image src="/assets/images/logo.png" alt="logo" width={40} height={40} />
        </div>
        <ul className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a href="#" className={`nav-link ${item.active ? 'active' : ''}`}>
                <span className="nav-icon"><i className={item.icon}></i></span>
                {item.name}
                {item.badge && (
                  <span className="badge bg-warning text-dark ms-auto">{item.badge} ssss</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-content-settings">
        <div className="sidebar-settings-balance">
          <div className="balance-amount">
            <div className="balance-amount-icon">
              <Image src="/assets/images/dollar.png" alt="dollar" width={20} height={20} />
            </div>
            <div className="balance-amount-text">
              <span>2,099</span>
            </div>
          </div>
          <div className="balance-amount-button">
            <button>Top up</button>
          </div>
        </div>
        <div className="sidebar-settings-avatar">
          <Image
            src="https://i.pinimg.com/1200x/31/f0/b0/31f0b0c453972949a3a54ac1f24e5aa5.jpg"
            alt="avatar"
            width={40}
            height={40}
          />
        </div>
        <ul className="sidebar-nav">
          {settingsItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a href="#" className="nav-link">
                <span className="nav-icon"><i className={item.icon}></i></span>
                {item.name}
                {item.toggle && (
                  <div className="form-check form-switch ms-auto">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>

  );
};

export default Sidebar;
