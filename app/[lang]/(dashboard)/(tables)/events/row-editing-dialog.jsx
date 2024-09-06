"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditingDialog from "./EditingDialog";
import toast from "react-hot-toast";
import { deleteEvent, getAircrafts } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { Plus } from "lucide-react";
import Blank from "@/components/blank";

const RowEditingDialog = ({ events, role }) => {
  const { isPending, data: aircrafts } = useQuery({
    queryKey: ["aircrafts"],
    queryFn: async () => await getAircrafts(),
  });
  if (isPending) return <LayoutLoader />;
  const handleDelete = async (id) => {
    try {
      const response = await deleteEvent(id);
      if (response) {
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete Event");
    }
  };
  if (events?.length < 1) {
    return (
      <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
        <div className=" text-default-900 text-xl font-semibold">
          No Events Defined
        </div>
        <div className=" text-sm  text-default-600 ">
          You have not defined any event yet.
        </div>
        <div></div>
        <Button onClick={() => (window.location.href = "/new-event")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-2" />
          Add Definition
        </Button>
      </Blank>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead> Parameter</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Phase</TableHead>
          {role === "gatekeeper" ||
            (role === "admin" && <TableHead>Action</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.displayName}</TableCell>
            <TableCell>{item.eventParameter}</TableCell>
            <TableCell>{item.eventType}</TableCell>
            <TableCell>
              <Badge
                variant="soft"
                color={
                  (item.flightPhase === "TakeOff" && "default") ||
                  (item.flightPhase === "Climb" && "success") ||
                  (item.flightPhase === "Cruise" && "info") ||
                  (item.flightPhase === "Descent" && "warning") ||
                  (item.flightPhase === "Landing" && "destructive")
                }
                className=" capitalize"
              >
                {item.flightPhase}
              </Badge>
            </TableCell>
            {role === "gatekeeper" ||
              (role === "admin" && (
                <TableCell className="flex justify-end">
                  <div className="flex gap-3">
                    <EditingDialog item={item} aircraftList={aircrafts} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className=" h-7 w-7"
                          color="secondary"
                        >
                          <Icon icon="heroicons:trash" className=" h-4 w-4  " />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className=" bg-secondary">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/80"
                            onClick={() => handleDelete(item.id)}
                          >
                            Ok
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RowEditingDialog;
