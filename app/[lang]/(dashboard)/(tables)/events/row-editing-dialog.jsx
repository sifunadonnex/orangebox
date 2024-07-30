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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { deleteEvent } from '@/action/api-action'
const RowEditingDialog = ({events}) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteEvent(id);
      if (response) {
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete Event");
    }
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead> Parameter</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Phase</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.data.map((item) => (
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
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <EditingDialog item={item} />
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
                      <AlertDialogAction className="bg-destructive hover:bg-destructive/80"
                      onClick={() => handleDelete(item.id)}
                      >
                        Ok
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RowEditingDialog;

