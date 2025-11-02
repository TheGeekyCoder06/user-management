import AddUser from "@/components/add-user";
import { fetchUsers } from "@/actions/index.js";
import SingleUserCard from "@/components/single-user-card";

export default async function Home() {
  const getUsers = await fetchUsers();

  console.log("Fetched users:", getUsers);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-6">
          <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
            User Management
          </h1>
          <AddUser />
        </div>

        <div className="text-center text-zinc-500 dark:text-zinc-400 grid grid-cols-2 gap-5">
          {getUsers && getUsers.users && getUsers.users.length > 0 ? (
            getUsers.users.map((userItem) => (
              <SingleUserCard key={userItem._id} user={userItem} />
            ))
          ) : (
            <p>No users yet. Click “Add User” to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
