"use client";
import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import ModuleSidebar from "./module";
import PopoverSidebar from "./popover";
import ClassicSidebar from "./classic";
import MobileSidebar from "./mobile-sidebar";
import { useSession } from "next-auth/react";

const Sidebar = ({ trans }) => {
  const { data: session } = useSession();
  const { sidebarType, collapsed } = useSidebar();
  const { layout } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  let selectedSidebar = null;

  if (!isDesktop && (sidebarType === "popover" || sidebarType === "classic")) {
    selectedSidebar = <MobileSidebar user={session?.user?.email} />;
  } else {
    const sidebarComponents = {
      module: <ModuleSidebar user={session?.user?.email} collapsed={collapsed} trans={trans} />,
      popover: <PopoverSidebar user={session?.user?.email} collapsed={collapsed} trans={trans} />,
      classic: <ClassicSidebar user={session?.user?.email} trans={trans} />,
    };

    selectedSidebar = sidebarComponents[sidebarType] || <ModuleSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
