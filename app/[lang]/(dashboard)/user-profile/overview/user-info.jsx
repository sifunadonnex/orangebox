import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Location, Aircraft, CalenderCheck } from "@/components/svg";
import ReactImage from "@/public/images/all-img/react.png"
import Image from "next/image";
const UserInfo = ({user}) => {
  console.log(user)
  const userInfo = [
    {
      icon: User,
      label: "Full Name",
      value: user?.fullName
    },
    {
      icon: Phone,
      label: "Mobile",
      value: user?.phone
    },
    {
      icon: Location,
      label: "Company",
      value: user?.company
    },
    {
      icon: CalenderCheck,
      label: "Joining Date",
      value: new Date(user?.createdAt).toDateString()
    },
  ]
  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Information</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-default-600">
          Here is some information about you. You can edit this information from your profile settings.
        </p>
        <ul className="mt-6 space-y-4">
          {
            userInfo.map((item, index) => (
              <li
                key={`user-info-${index}`}
                className="flex items-center"
              >
                <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                  <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                  <span className="text-sm font-medium text-default-800">{item.label}: </span>
                </div>
                <div className="flex-1 text-sm text-default-700"> {item.value}</div>
              </li>
            ))
          }
        </ul>
        <div className="mt-6 text-lg font-medium text-default-800 mb-4">Aircrafts Count</div>
        <div className="space-y-3">
          {
            [
              {
                title: "Aircrafts",
                icon: Aircraft,
                total: user?.Aircraft?.length
              }
            ].map((item, index) => (
              <div
                key={`active-team-${index}`}
                className="flex items-center gap-2"
              >
                <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                <div className="text-sm font-medium text-default-800">
                  {item.title}
                  <span className="font-normal">
                    ({item.total} Aircrafts)
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;