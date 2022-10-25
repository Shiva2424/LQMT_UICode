import React, { useState } from "react";
import "./Sidebar.css";
import { FaHome, FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

export type SidebarProps = {
  classes?: any;
  children: any;
  isopen: boolean;
  setIsOpen: any;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {isopen, setIsOpen, children} = props;
  // const [isopen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isopen);
  const [selectedmenuitem, setSelectedMenuItem] = useState("Home");
  const menuItems = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/aggregateview",
      name: "LQM - Actual",
    },
    {
      path: "/decisionpending",
      name: "LQM - Decision Pending",
    },
    {
      path: "/exceptionview",
      name: "LQM - Exception",
    },
    {
      path: "/limitbreachview",
      name: "LQM - Limit Breach",
    },
    {
      path: "/pendingsettled",
      name: "LQM - Forecast",
    },
    {
      path: "/limitview",
      name: "LQM - Set Limit",
    },
  ];
  const handleselecteditem = (itemseleted: string) => {
    setSelectedMenuItem(itemseleted);
  }
  return (
    <>
      <div className="container">
        <div className={isopen ? "sidebar" : "hidesidebar"}>
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
          {isopen &&
            menuItems.map((item, index) => (
              <NavLink to={`${item.path}`} className={`link ${selectedmenuitem === item.name && 'selected'}`} onClick={() => handleselecteditem(item.name)}>
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}
          {isopen && (
            <div style={{ position: "absolute", bottom: 0,transition: 'all 0.5s' }}>
              <img
                src="https://png.pngitem.com/pimgs/s/430-4302470_wells-fargo-logo-wells-fargo-new-logo-hd.png"
                alt="Logo not present"
                width="180px"
              />
            </div>
          )}
        </div>
        <main style={{ width: "inherit", overflow: 'scroll' }}>{children}</main>
      </div>
    </>
  );
};
export default Sidebar;
