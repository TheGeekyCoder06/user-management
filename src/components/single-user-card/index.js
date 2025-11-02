"use client";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/index.js";
import { useContext } from "react";
import { UserContext } from "@/context/index.js";
import { toast } from "sonner";

export default function SingleUserCard({ user }) {
  const { _id, name, email } = user;

  // ✅ Correct place to use hooks
  const {
    setAddNewUserFormData,
    setOpenPop,
    setCurrentEditedID,
    currentEditedID,
  } = useContext(UserContext);

  async function handleEdit(getCurrentUser) {
    // Now you can safely use the context values
    setOpenPop(true);
    setAddNewUserFormData({
      name: getCurrentUser?.name,
      email: getCurrentUser?.email,
      address: getCurrentUser?.address,
      phone: getCurrentUser?.phone,
    });
    setCurrentEditedID(getCurrentUser?._id);
    console.log("Edit user with ID:", getCurrentUser._id);
  }

  async function handleDeleteUser(userId) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const result = await deleteUser(userId);
    console.log(result);

    if (result.success) {
      toast.success("User deleted successfully!", {
        description: "The user record has been removed from the database.",
      });
    } else {
      toast.error("Failed to delete user", {
        description: result.message || "An unexpected error occurred.",
      });
    }
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 mb-4 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {name}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          onClick={() => handleEdit(user)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="hover:bg-red-600 dark:hover:bg-red-700"
          onClick={() => handleDeleteUser(user._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
