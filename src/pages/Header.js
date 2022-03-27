import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      <MenuItem url={'search'} />
      <MenuItem url={'item2'} />
      <MenuItem url={'item3'} />
    </ul>
  );
};

const MenuItem = ({ url }) => {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };
  return (
    <li>
      <NavLink
        to={`/${url}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {url}
      </NavLink>
    </li>
  );
};

export default Header;