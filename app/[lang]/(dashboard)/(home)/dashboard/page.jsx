import DashboardPageView from "./page-view";
import { getDictionary } from "@/app/dictionaries";

const Dashboard = async ({ params: { lang } }) => {
  const trans = await getDictionary(lang);
  return <DashboardPageView trans={trans} />;
};

export default Dashboard;
