import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item,handleDisplay }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  

  return (
    <>
    <IconContext.Provider value={{color:'#fff'}}>

    
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav} >
        <div>
          {item.icon}
          <SidebarLabel >{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}  onClick={handleDisplay}>
              {item.icon}
              <SidebarLabel value={item.path}>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </IconContext.Provider>
    </>

  );
};

export default SubMenu;