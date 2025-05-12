import AccountsTable from "./components/accountsTable";

export default async function Home() {
  return (
    <main className="w-1/2 mx-auto mt-10">
      <AccountsTable />
    </main>
  );
}
