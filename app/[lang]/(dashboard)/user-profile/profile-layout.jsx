"use client"
import React from "react"
import { usePathname } from "next/navigation";
import Header from "./components/header";
import SettingsHeader from "./components/settings-header"
import { useSession } from "next-auth/react"
import { getUserByEmail } from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
const ProfileLayout = ({ children }) => {
  const location = usePathname();
  const { data: session, status } = useSession()
  if (status === "loading") return <LayoutLoader />
  if (location === "/user-profile/settings") {
    return <React.Fragment>
      <SettingsHeader />
      <div className="mt-6">
        {children}
      </div>
    </React.Fragment>
  }

  return (
    <React.Fragment>
      <Header user = {session?.user} />
      {children}
    </React.Fragment>
  );

};

export default ProfileLayout;