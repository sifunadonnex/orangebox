"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import coverImage from "@/public/images/auth/mountain.png"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import avatar from "@/public/images/all-img/user-cover.png"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
const Header = ({user}) => {
  const location = usePathname();
  return (
    <Fragment>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Home className="h-4 w-4" />
        </BreadcrumbItem>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Users</BreadcrumbItem>
        <BreadcrumbItem>User Profile</BreadcrumbItem>
      </Breadcrumbs>
      <Card className="mt-6 rounded-t-2xl ">
        <CardContent className="p-0">
          <div className="relative h-[200px] lg:h-[296px] rounded-t-2xl w-full object-cover bg-no-repeat"
            style={{ backgroundImage: `url(${coverImage.src})` }}
          >
            <div className="flex items-center gap-4 absolute ltr:left-10 rtl:right-10 -bottom-2 lg:-bottom-8">
              <div>
                <Image
                  src={user?.image||avatar}
                  alt="user"
                  className="h-20 w-20 lg:w-32 lg:h-32 rounded-full"
                />
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-1">{user.name}</div>
                <div className="text-xs lg:text-sm font-medium text-default-100 dark:text-default-900 pb-1.5">{user.email}</div>
              </div>
            </div>
            <Button asChild className="absolute bottom-5 ltr:right-6 rtl:left-6 rounded px-5 hidden lg:flex" size="sm">
              <Link href="/user-profile/settings">
                <Icon className="w-4 h-4 ltr:mr-1 rtl:ml-1" icon="heroicons:pencil-square" />
                Edit
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-end gap-4 lg:gap-8 pt-7 lg:pt-5 pb-4 px-6">
            {
              [
                {
                  title: "Overview",
                  link: "/user-profile"
                },
                {
                  title: "Settings",
                  link: "/user-profile/settings"
                },
              ].map((item, index) => (
                <Link
                  key={`user-profile-link-${index}`}
                  href={item.link}
                  className={cn("text-sm font-semibold text-default-500 hover:text-primary relative lg:before:absolute before:-bottom-4 before:left-0 before:w-full lg:before:h-[1px] before:bg-transparent", {
                    "text-primary lg:before:bg-primary": location ===  item.link
                  })}
                >{item.title}</Link>
              ))
            }
          </div>

        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;