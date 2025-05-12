"use client";

import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import AddAccountModal from "./accounts/add-account-modal";

export const AccountsTable = () => {
  const { data: accounts, isPending: isLoadingAccounts } = useQuery({
    queryKey: ["get-all-accounts"],
    queryFn: async () => {
      const res = await client.account.getAll.$get();
      return await res.json();
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Accounts: ({accounts?.length || 0})
        </h1>
        <AddAccountModal>
          <Button>Create Account</Button>
        </AddAccountModal>
      </div>
      <div>
        <ul>
          {accounts?.map((account) => (
            <li key={account.id}>
              {account.name} | {account.bankName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountsTable;
