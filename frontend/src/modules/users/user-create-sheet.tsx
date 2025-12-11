"use client";

/* eslint-disable react/no-children-prop */
import * as React from "react";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createUser } from "./user.actions";
import { USER_TYPES } from "./user.const";
import { toast } from "sonner";
import { Plus, Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  user_name: z
    .string()
    .min(3, "user name must be at least 3 characters.")
    .max(100, "user name must be at most 100 characters."),
  email: z
    .string()
    .min(3, "email must be at least 3 characters.")
    .max(100, "email must be at most 100 characters."),
  password: z
    .string()
    .min(3, "password must be at least 3 characters.")
    .max(100, "password must be at most 100 characters."),
  is_admin: z
    .number()
    .min(0, "is_admin must be at least 0")
    .max(1, "is_admin must be at most 1"),
});

export function UserCreateSheet() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      is_admin: 0,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const userData: IUserInsertDTO = {
        user_name: value.user_name,
        email: value.email,
        password: value.password,
        is_admin: value.is_admin,
      };

      startTransition(async () => {
        const result = await createUser(userData);

        if (result.success) {
          toast.success("User created successfully");
          //   setOpen(false);
          form.reset();
          router.refresh();
        } else {
          toast.error(result.message || "Failed to create user");
        }
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={(value) => !pending && setOpen(value)}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" />
          New User
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl">Create New User</SheetTitle>
          <SheetDescription>
            Add a new task to your user list. Fill in the details below.
          </SheetDescription>
        </SheetHeader>
        <form
          id="create-user-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex-1 overflow-y-auto px-4 py-2"
        >
          <fieldset disabled={pending} className="disabled:opacity-50">
            <FieldGroup className="gap-5">
              <form.Field
                name="user_name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="What needs to be done?"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email{" "}
                        <span className="text-muted-foreground font-normal">
                        </span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Add some details..."
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Password <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="What needs to be done?"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="is_admin"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                      <Select
                        value={String(field.state.value)}
                        onValueChange={(value) =>
                          field.handleChange(parseInt(value))
                        }
                        disabled={pending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select admin or not" />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_TYPES.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={String(type.value)}
                            >
                              <span className={cn("font-medium", type.color)}>
                                {type.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </fieldset>
        </form>
        <SheetFooter className="px-4 pt-4 border-t gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={pending}
            className="flex-1"
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button
            type="submit"
            form="create-user-form"
            disabled={pending}
            className="flex-1"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Create User
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
