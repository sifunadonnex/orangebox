import {
  Application,
  Chart,
  Components,
  DashBoard,
  Aircraft,
  Flight,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
  Users,
} from "@/components/svg";

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      child: [
        {
          title: "Analytics",
          href: "/dashboard",
          icon: Graph,
        },
      ],
    },
    {
      title: "Application",
      icon: Application,
      child: [
        // {
        //   title: "support",
        //   icon: Messages,
        //   href: "/chat",
        // },
        // {
        //   title: "calendar",
        //   icon: Calendar,
        //   href: "/calendar",
        // },
      ],
    },
    {
      title: "Flight Events",
      icon: Book,
      megaMenu: [
        {
          title: "Events",
          icon: Diamond,
          child: [
            {
              title: "Event List",
              href: "/events",
            },
            {
              title: "New Definition",
              href: "/new-event",
            },
          ],
        },
        {
          title: "Exceedances",
          icon: Error,
          href: "/exceedances",
        },
      ],
    },
    {
      title: "Administrative",
      icon: Files,
      role:'admin',
      megaMenu: [
        {
          title: "Users",
          icon: Users,
          child: [
            {
              title: "User List",
              href: "/users",
            },
            {
              title: "New User",
              href: "/new-user",
            },
          ],
        },
        {
          title: "Aircrafts",
          icon: Aircraft,
          child: [
            {
              title: "Aircraft List",
              href: "/aircrafts",
            },
            {
              title: "New Aircraft",
              href: "/new-aircraft",
            },
          ],
        },
        {
          title: "Flights",
          icon: Flight,
          child: [
            {
              title: "Flights List",
              href: "/flights",
            },
            {
              title: "New Flights",
              href: "/new-flight",
            },
          ],
        },
        {
          title: "Operators",
          icon: Users,
          child: [
            {
              title: "Operator List",
              href: "/operators",
            },
            {
              title: "New Operator",
              href: "/new-operator",
            },
          ],
        },
        {
          title: "Roles",
          icon: Users,
          child: [
            {
              title: "Role List",
              href: "/roles",
            },
            {
              title: "New Role",
              href: "/new-role",
            },
          ],
        },
        {
          title: "Permissions",
          icon: Users,
          child: [
            {
              title: "Permission List",
              href: "/permissions",
            },
            {
              title: "New Permission",
              href: "/new-permission",
            },
          ],
        },
      ],
    },
    {
      title: "Chart",
      icon: ChartArea,
      megaMenu: [
        {
          title: "Flights",
          icon: ChartBar,
          href: "/flights",
        },
      ],
    },
    {
      title: "Reports",
      icon: Note,
      megaMenu: [
        {
          title: "Flight Reports",
          icon: ChartBar,
          href: "/flight-reports",
        },
        {
          title: "Severity Reports",
          icon: ChartBar,
          href: "/severity-reports",
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
          },
        ],
      },
      {
        title: "Administrative",
        icon: Files,
        role:'admin',
        child: [
          {
            title: "Users",
            icon: Users,
            child: [
              {
                title: "User List",
                href: "/users",
              },
              {
                title: "New User",
                href: "/new-user",
              },
            ],
          },
          {
            title: "Aircrafts",
            icon: Aircraft,
            child: [
              {
                title: "Aircraft List",
                href: "/aircrafts",
              },
              {
                title: "New Aircraft",
                href: "/new-aircraft",
              },
            ],
          },
          {
            title: "Flights",
            icon: Flight,
            child: [
              {
                title: "Flights List",
                href: "/flights",
              },
              {
                title: "New Flights",
                href: "/new-flight",
              },
            ],
          },
        ],
      },
      {
        title: "Application",
        icon: Application,
        child: [
          // {
          //   title: "support",
          //   icon: Messages,
          //   href: "/chat",
          // },
          // {
          //   title: "calendar",
          //   icon: Calendar,
          //   href: "/calendar",
          // },
        ],
      },
      {
        title: "Flight Events",
        icon: Book,
        child: [
          {
            title: "Events",
            icon: Diamond,
            nested: [
              {
                title: "Event List",
                href: "/events",
              },
              {
                title: "New Definition",
                href: "/new-event",
              },
            ],
          },
          {
            title: "Exceedances",
            icon: Error,
            href: "/exceedances",
          },
          {
            title: "Invoice",
            icon: Files,
            nested: [
              {
                title: "Create Invoice",
                href: "/create-invoice",
              },
              {
                title: "Invoice Details",
                href: "/invoice-details",
              },
              {
                title: "Invoice List",
                href: "/invoice-list",
              },
            ],
          },
        ],
      },
      {
        title: "Administrative",
        role:'admin',
        icon: Files,
        child: [
          {
            title: "Users",
            icon: Users,
            role:'admin',
            nested: [
              {
                title: "User List",
                href: "/users",
              },
              {
                title: "New User",
                href: "/new-user",
              },
            ],
          },
          {
            title: "Aircrafts",
            icon: Aircraft,
            role:'admin',
            nested: [
              {
                title: "Aircraft List",
                href: "/aircrafts",
              },
              {
                title: "New Aircraft",
                href: "/new-aircraft",
              },
            ],
          },
          {
            title: "Flights",
            icon: Flight,
            role:'admin',
            nested: [
              {
                title: "Flights List",
                href: "/flights",
              },
              {
                title: "New Flights",
                href: "/new-flight",
              },
            ],
          },
        ],
      },
      {
        title: "Chart",
        icon: ChartArea,
        child: [
          {
            title: "Flights",
            icon: ChartBar,
            href: "/flights",
          },
        ],
      },
      {
        title: "Reports",
        icon: Note,
        child: [
          {
            title: "Flight Reports",
            icon: ChartBar,
            href: "/flight-reports",
          },
          {
            title: "Severity Reports",
            icon: ChartBar,
            href: "/severity-reports",
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
        isOpen: false,
        isHide: false,
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
          },
        ],
      },
      // {
      //   title: "support",
      //   icon: Messages,
      //   href: "/chat",
      // },
      // {
      //   title: "calendar",
      //   icon: Calendar,
      //   href: "/calendar",
      // },
      {
        isHeader:true,
        title:"Administrative",
        role:'admin'
      },
      {
        title: "Users",
        icon: Users,
        role:'admin',
        href: "#",
        isHide: false,
        child: [
          {
            title: "User List",
            href: "/users",
          },
          {
            title: "New User",
            href: "/new-user",
          },
        ],
      },
      {
        title: "Aircrafts",
        icon: Aircraft,
        role:'admin',
        child: [
          {
            title: "Aircraft List",
            href: "/aircrafts",
          },
          {
            title: "New Aircraft",
            href: "/new-aircraft",
          },
        ],
      },
      {
        title: "Events",
        icon: Diamond,
        href: "#",
        isHide: false,
        child: [
          {
            title: "Event List",
            href: "/events",
          },
          {
            title: "New Definition",
            href: "/new-event",
          },
        ],
      },
      {
        title: "Flights",
        icon: Flight,
        role:'admin',
        child: [
          {
            title: "Flights List",
            href: "/flights",
          },
          {
            title: "New Flights",
            href: "/new-flight",
          },
        ],
      },
      {
        isHeader: true,
        title: "Application",
      },
      {
        title: "Exceedances",
        icon: Error,
        href: "/exceedances",
      },
      {
        isHeader: true,
        title: "Elements",
      },
      {
        title: "Chart",
        icon: ChartArea,
        child: [
          {
            title: "Flights",
            icon: ChartBar,
            href: "/flights",
          },
        ],
      },
      {
        title: "Reports",
        icon: Note,
        child: [
          {
            title: "Flight Reports",
            icon: ChartBar,
            href: "/flight-reports",
          },
          {
            title: "Severity Reports",
            icon: ChartBar,
            href: "/severity-reports",
          },
        ],
      },
    ],
  },
};
