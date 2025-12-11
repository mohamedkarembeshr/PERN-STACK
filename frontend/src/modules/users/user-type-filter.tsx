"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FullScreenLoader from "@/features/dialogs/loading-dialog";
import { useTransition } from "react";

const USER_TYPE: { key: string; value: string }[] = [
  { key: "user", value: '0' },
  { key: "admin", value: '1' },
];

export function UserTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pending, startTransition] = useTransition();

  const currentStatus = searchParams.get("is_admin") || "";

  function handleStatusChange(value: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "none") {
        params.delete("is_admin");
      } else {
        params.set("is_admin", value);
      }

      router.push(`?${params.toString()}`);
    });
  }

  return (
    <>
      <Select
        value={currentStatus || "none"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {USER_TYPE.map((status) => (
            <SelectItem key={status.key} value={status.value}>
              {status.key.charAt(0).toUpperCase() + status.key.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FullScreenLoader isLoading={pending} headerText="Loading users..." />
    </>
  );
}
