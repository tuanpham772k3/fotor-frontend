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

const Sidebar = ({ sidebarOpen, closeSidebar }: SidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    { name: 'Explore', icon: 'fa-solid fa-house', active: false },
    { name: 'AI Photos', icon: 'fa-solid fa-image', active: false },
    { name: 'AI Videos', icon: 'fa-regular fa-file-video', active: false },
    { name: 'AI Design', icon: 'fa-solid fa-pen-ruler', active: false },
    { name: 'Projects', icon: 'fa-solid fa-folder-open', active: false },
    { name: 'Help', icon: 'fa-solid fa-question-circle', active: false },
    { name: 'Feedback', icon: 'fa-solid fa-comments', active: false },
    { name: 'About', icon: 'fa-solid fa-info-circle', active: false },
    
  ];

  const settingsItems: SettingsItem[] = [
    // { name: '', icon: 'fa-solid fa-gift' },
    // { name: '', icon: 'fa-solid fa-bell' },
    { name: 'Settings', icon: 'fa-solid fa-gear' },
  ];

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

        <div className="sidebar-content-main">
          <div className="sidebar-logo">
            <a href="#" className="sidebar-logo-link">
             <span className="nav-icon"> <i className="fa-solid fa-house"></i> </span>
            </a>
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
          {/* <div className="sidebar-settings-balance">
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
          </div> */}
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
    </>
  );
};

export default Sidebar;
