"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
const pages = [
  {
    text: "overview",
    value: "overview",
  },
  {
    text: "chart",
    value: "chart",
  },
  {
    text: "Exceedance Table",
    value: "table",
  },
  {
    text: "settings",
    value: "settings",
  },
];
const PageLink = ({ id }) => {
  const locationName = usePathname();
  return pages.map((item) => (
    <Link
      key={item.value}
      href={`/exceedances/${id}/${item.value}`}
      className={cn(
        "text-sm font-semibold text-default-500 capitalize pb-3 border-b border-transparent cursor-pointer",
        {
          "border-primary": locationName === `/exceedances/${id}/${item.value}`,
        }
      )}
    >
      {item.value}
    </Link>
  ));
};

export default PageLink;
