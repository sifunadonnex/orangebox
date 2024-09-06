
'use client'
import UserInfo from './overview/user-info';
import Portfolio from './overview/portfolio';
import Skills from './overview/skills';
import Connections from "./overview/connections"
import Teams from "./overview/teams"
import About from "./overview/about"
import RecentActivity from "./overview/recent-activity"
import Projects from './overview/projects';
import { useUser } from "@/store";
import LayoutLoader from "@/components/layout-loader";
const Overview = () => {
  const userDetails = useUser((state) => state.user);
  if (!userDetails) return <LayoutLoader />;
  return (
    <div className="pt-6 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <UserInfo user = {userDetails} />
        {/* <Portfolio />
        <Skills />
        <Connections />
        <Teams /> */}
      </div>
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <About user = {userDetails} />
        {/* <RecentActivity />
        <Projects /> */}
      </div>
    </div>
  );
};

export default Overview;