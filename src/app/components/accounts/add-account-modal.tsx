"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { client } from "@/lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CREATE_ACCOUNT_SCHEMA = z.object({
  bankName: z.string().min(3),
  name: z.string().min(3),
});

type AddAccountForm = z.infer<typeof CREATE_ACCOUNT_SCHEMA>;

const AddAccountModal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createAccount, isPending: isCreatingAccount } = useMutation({
    mutationFn: async (data: AddAccountForm) => {
      await client.account.create.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-accounts"] });
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAccountForm>({
    resolver: zodResolver(CREATE_ACCOUNT_SCHEMA),
    defaultValues: {
      bankName: "",
      name: "",
    },
  });

  const onSubmit = (data: AddAccountForm) => {
    createAccount(data);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        className="max-w-xl p-8"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              New Bank Account
            </h2>
          </div>
          <p className="text-sm/6 text-gray-600">
            Create a new bank account to organize your finances.
          </p>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Bank Name</Label>
              <Input
                autoFocus
                id="bankName"
                placeholder="Chase Bank"
                className="w-full"
                {...register("bankName")}
              />
              {errors.bankName ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bankName.message}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="name">Account Name</Label>
              <Input
                autoFocus
                id="name"
                placeholder="College Checkings"
                className="w-full"
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreatingAccount}>
                {isCreatingAccount ? "Creating..." : "Create account"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAccountModal;
