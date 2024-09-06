"use client";
import React, { useState } from "react";

import { cn, isLocationMatch, getDynamicPath } from "@/lib/utils";
import SidebarLogo from "../common/logo";
import { menusConfig } from "@/config/menus";
import MenuLabel from "../common/menu-label";
import SingleMenuItem from "./single-menu-item";
import SubMenuHandler from "./sub-menu-handler";
import NestedSubMenu from "../common/nested-menus";
import { useSidebar, useThemeStore } from "@/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import AddBlock from "../common/add-block";
import { getUserByEmail, getAircraftById } from "@/action/api-action";
import { useUser } from "@/store";

const PopoverSidebar = ({ user, trans }) => {
  const { setUser } = useUser()
  const [isAdmin, setIsAdmin] = useState(false);
  const { collapsed, sidebarBg } = useSidebar();
  const { layout, isRtl } = useThemeStore();
  const menus = menusConfig?.sidebarNav?.classic || [];
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMultiMenu, setMultiMenu] = useState(null);
  //filter menus for admin
  //menus.filter((item) => item.title !== "Administrative");
  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const getUser = async ()=>{
    const userData = await getUserByEmail(user)
    if (userData?.role === "admin") {
      setIsAdmin(true)
    }
    //get aircraft id list from user
    if(userData?.Aircraft && userData?.role === "gatekeeper"){
      const aircraftIdList = userData?.Aircraft?.map((item)=>item.id)
      userData.aircraftIdList = aircraftIdList
      setUser(userData)
    }
    if (userData?.role === "client") {
      const aircraftIdList = await getAircraftById(userData.gateId)
      userData.aircraftIdList = aircraftIdList?.map((item)=>item.id)
      setUser(userData)
    }
  }

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  React.useEffect(() => {
    getUser()
  }, [user])
  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menus?.map((item, i) => {
      if (item?.child) {
        item.child.map((childItem, j) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem, k) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
  }, [locationName]);

  // menu title

  return (
    <div
      className={cn("fixed  top-0  border-r  ", {
        "w-[248px]": !collapsed,
        "w-[72px]": collapsed,
        "m-6 bottom-0   bg-card rounded-md": layout === "semibox",
        "h-full   bg-card ": layout !== "semibox",
      })}
    >
      {sidebarBg !== "none" && (
        <div
          className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}
      <SidebarLogo collapsed={collapsed} />
      <Separator />
      <ScrollArea
        className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
          "px-4": !collapsed,
        })}
      >
        <ul
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(" space-y-1", {
            " space-y-2 text-center": collapsed,
          })}
        >
          {isAdmin ? (
            menus.map((item, i) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}
  
                {!item.child && !item.isHeader && (
                  <SingleMenuItem
                    item={item}
                    collapsed={collapsed}
                    trans={trans}
                  />
                )}
  
                {/* menu label */}
                {item.isHeader && !item.child && !collapsed && (
                  <MenuLabel item={item} trans={trans} />
                )}
  
                {/* sub menu */}
                {item.child && (
                  <>
                    <SubMenuHandler
                      item={item}
                      toggleSubmenu={toggleSubmenu}
                      index={i}
                      activeSubmenu={activeSubmenu}
                      collapsed={collapsed}
                      menuTitle={item.title}
                      trans={trans}
                    />
                    {!collapsed && (
                      <NestedSubMenu
                        toggleMultiMenu={toggleMultiMenu}
                        activeMultiMenu={activeMultiMenu}
                        activeSubmenu={activeSubmenu}
                        item={item}
                        index={i}
                        collapsed={collapsed}
                        trans={trans}
                      />
                    )}
                  </>
                )}
              </li>
            ))
          ):(
            menus.filter((item) => item.role !== "admin").map((item, i) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}
  
                {!item.child && !item.isHeader && (
                  <SingleMenuItem
                    item={item}
                    collapsed={collapsed}
                    trans={trans}
                  />
                )}
  
                {/* menu label */}
                {item.isHeader && !item.child && !collapsed && (
                  <MenuLabel item={item} trans={trans} />
                )}
  
                {/* sub menu */}
                {item.child && (
                  <>
                    <SubMenuHandler
                      item={item}
                      toggleSubmenu={toggleSubmenu}
                      index={i}
                      activeSubmenu={activeSubmenu}
                      collapsed={collapsed}
                      menuTitle={item.title}
                      trans={trans}
                    />
                    {!collapsed && (
                      <NestedSubMenu
                        toggleMultiMenu={toggleMultiMenu}
                        activeMultiMenu={activeMultiMenu}
                        activeSubmenu={activeSubmenu}
                        item={item}
                        index={i}
                        collapsed={collapsed}
                        trans={trans}
                      />
                    )}
                  </>
                )}
              </li>
            ))
          )}
        </ul>
        {!collapsed && (
          <div className="-mx-2 ">
            <AddBlock />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PopoverSidebar;
