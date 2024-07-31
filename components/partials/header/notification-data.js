import avatar1 from "@/public/images/avatar/avatar-7.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";

export const notifications = [
  {
    id: 1,
    fullName: "Felecia Rower",
    role: "Flight Data Analyst",
    message:
      "Exceedance detected: Engine RPM exceeded limit during takeoff. Review required.",
    avatar: avatar1,
    status: "online",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 2,
    fullName: "Adalberto Granzin",
    role: "Safety Officer",
    message:
      "Event alert: Sudden altitude drop detected. Check pilot report and flight data.",
    avatar: avatar2,
    status: "online",
    unreadmessage: 1,
    date: "11 am",
  },
  {
    id: 3,
    fullName: "Joaquina Weisenborn",
    role: "Flight Operations Manager",
    message:
      "Notification: Landing gear deployment delay recorded. Maintenance team notified.",
    avatar: avatar3,
    status: "busy",
    unreadmessage: 1,
    date: "12 pm",
  },
  {
    id: 4,
    fullName: "Verla Morgano",
    role: "Data Scientist",
    message:
      "Analysis required: High turbulence levels detected over the Atlantic. Prepare detailed report.",
    avatar: avatar4,
    status: "online",
    unreadmessage: 2,
    date: "1 pm",
  },
  {
    id: 5,
    fullName: "Margot Henschke",
    role: "Aircraft Performance Engineer",
    message:
      "Performance alert: Fuel consumption rate higher than expected during cruise phase.",
    avatar: avatar5,
    status: "busy",
    unreadmessage: 0,
    date: "3 pm",
  },
];
