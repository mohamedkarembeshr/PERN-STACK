"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/features/data-table";
import { UserRowActions } from "./user-row-actions";

const statusVariants: Record<TUserStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  "in-progress": "secondary",
  completed: "default",
  cancelled: "destructive",
};

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("user_id")}</span>,
  },
  {
    accessorKey: "user_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="username" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate font-medium">
        {row.getValue("user_name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate text-muted-foreground">
        {row.getValue("email") || "-"}
      </div>
    ),
  },

  {
    accessorKey: "is_admin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admin" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("is_admin") as number;
      return (
        <Badge variant={priority >= 3 ? "destructive" : priority >= 2 ? "secondary" : "outline"}>
          {priority}
        </Badge>
      );
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions row={row} />,
  },
];
