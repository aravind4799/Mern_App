import React,{useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons';
const Nav = styled.div`
background:#15171c;
height:80px;
display:flex;
justify-content:flex-start;
align-items:center;
`
const NavIcon =styled(Link)`
margin-left:2rem;
font-size:2rem;
height:80px;
display:flex;
justify-content:flex-start;
align-items:center;
`

const SidebarNav = styled.nav`
background:#15171c;
width:250px;
height:100vh;
display:flex;
justify-content:center;
position:fixed;
top:0;
left:${({sidebar})=>(sidebar ? '0':'-100%')};
z-index:20;
transition:350ms;
`

const SidebarWrap = styled.div`
width:100%;
`



const Sidebar = () => {
const [sidebar,setSidebar]=useState(false)
const showSidebar = (e) => {
    setSidebar(!sidebar)
   
}
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
        <Nav>
            <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar} >
            <SidebarWrap>
                <NavIcon to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </NavIcon>
                {SidebarData.map((items,index)=>{
                    return (
                        <SubMenu item={items} key={index} handleDisplay={showSidebar}  />
                    ) 
                })}
            </SidebarWrap>
        </SidebarNav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar
