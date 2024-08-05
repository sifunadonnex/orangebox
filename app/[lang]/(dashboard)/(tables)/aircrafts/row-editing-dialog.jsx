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
import toast from "react-hot-toast";
import EditingDialog from "./EditingDialog";
import { deleteAircraft } from '@/action/api-action'
const RowEditingDialog = ({aircrafts, userList}) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteAircraft(id);
      if (response) {
        toast.success("Aircraft deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete aircraft");
    }
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">User</TableHead>
          <TableHead> Tail Number</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Airline</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {aircrafts.data.map((item) => (
          <TableRow key={item.email}>
            <TableCell className=" font-medium  text-card-foreground/80">
              <div className="flexgap-3 items-center">
                <Avatar className="rounded-full">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <span className=" text-sm   text-card-foreground">
                  {item.fullName}
                </span>
              </div>
            </TableCell>

            <TableCell>{item.serialNumber}</TableCell>
            <TableCell>{item.aircraftMake}</TableCell>
            <TableCell>
              <Badge
                variant="soft"
                color={
                  (item.role === "Freedom" && "default") ||
                  (item.role === "ALS" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "editor" && "warning")
                }
                className=" capitalize"
              >
                {item.airline}
              </Badge>
            </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
              <EditingDialog item={item} userList= {userList?.users} />
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

