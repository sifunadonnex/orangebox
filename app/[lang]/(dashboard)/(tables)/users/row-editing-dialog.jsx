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
import { deleteUser } from '@/action/api-action'
const RowEditingDialog = ({users}) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response) {
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">User</TableHead>
          <TableHead> Company</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.map((item) => (
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

            <TableCell>{item.company}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Badge
                variant="soft"
                color={
                  (item.role === "admin" && "default") ||
                  (item.role === "client" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "editor" && "warning")
                }
                className=" capitalize"
              >
                {item.role}
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

