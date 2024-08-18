import React from "react";
import "../css/sidebaroption.css";
const SideBarOption = ({ name, Icon, active }) => {
  return (
    <div className={`sidebar-option ${active && "sidebar-option-active"}`}>
      <Icon />
      <h3>{name}</h3>
    </div>
  );
};

export default SideBarOption;
