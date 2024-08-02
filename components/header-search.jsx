import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {X} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";
const HeaderSearch = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="xl" className="p-0 " hiddenCloseIcon>
        <Command>
          <div className="flex items-center border-b border-default-200">
            <CommandInput
              placeholder=""
              className="h-14"
              inputWrapper="px-3.5 flex-1 border-none"
            />
            <div className="flex-none flex items-center justify-center gap-1 pr-4">
              <span className="text-sm text-default-500 font-normal select-none">
                [esc]
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent text-xs hover:text-default-800 px-1"
                onClick={() => setOpen(false)}
              >
                {" "}
                <X className="w-5 h-5 text-default-500" />
              </Button>
            </div>
          </div>
          <CommandList className="py-5 px-7 max-h-[500px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CommandGroup
                heading="Populer Searches"
                className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-default-400 [&_[cmdk-group-heading]]:mb-2.5
                [&_[cmdk-group-heading]]:uppercase    [&_[cmdk-group-heading]]:tracking-widest
                "
              >
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/calendar"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="heroicons:calendar-days" />
                    <span>Calendar</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/dashboard"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="heroicons:chart-bar" />
                    <span>Analytics</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/exceedances"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="ph:warning-duotone" />
                    <span>Exceedances</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 ">
                  <Link
                    href="/events"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="heroicons:calendar" />
                    <span>Events</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
              <CommandGroup
                heading="Apps & Pages"
                className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-default-400 [&_[cmdk-group-heading]]:mb-2.5
                [&_[cmdk-group-heading]]:uppercase    [&_[cmdk-group-heading]]:tracking-widest
                "
              >
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/support"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="heroicons:chat-bubble-bottom-center" />
                    <span>Support</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/aircrafts"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="mdi:airplane-landing" /> 
                    <span>Aircrafts</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link
                    href="/flights"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="mdi:airplane-takeoff" />
                    <span>Flights</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0">
                  <Link
                    href="/reports"
                    className="flex gap-1 items-center px-2 text-default-500 hover:text-primary "
                  >
                    <Icon icon="mdi:report-finance" />
                    <span>Reports</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default HeaderSearch;
