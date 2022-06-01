import React, { useState } from "react";
//react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
//icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
//sidebar css from react-pro-sidebar module
import "./Aside.css"

function Aside({menuCollapse, setMenuCollapse}){
//menuCollapse state using useState hook

//custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
//condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    return (
        <>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse} width={260}>

                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                Home
                            </MenuItem>
                            <MenuItem icon={<FaList />}>Category</MenuItem>
                            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                            <MenuItem icon={<BiCog />}>Settings</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle/>
                            ) : (
                                <FiArrowLeftCircle/>
                            )}
                        </div>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
}
export default Aside