"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addNewUserFormControls,
  addNewUserFormInitialState,
} from "@/utils/index.js";
import { addUser } from "@/actions/index.js"; // ✅ directly import server action
import { useContext } from "react";
import { UserContext } from "@/context/index.js";
import { editUser } from "@/actions/index.js";
import { toast } from "sonner";
export default function AddUser() {
  const {
    openPop,
    setOpenPop,
    addNewUserFormData,
    setAddNewUserFormData,
    currentEditedID,
    setCurrentEditedID,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  async function handleNewUserAction(e) {
    e.preventDefault();

    // frontend validation
    const isValid = Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() !== ""
    );
    if (!isValid) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Call the server action directly
      const result = currentEditedID
      ? await editUser(currentEditedID, addNewUserFormData)
      : await addUser(addNewUserFormData);

    if (result.success) {
      // ✅ Show success toast
      toast.success(
        currentEditedID
          ? "User updated successfully!"
          : "User added successfully!",
        {
          description: `Name: ${addNewUserFormData.name} | Email: ${addNewUserFormData.email}`,
          duration: 4000, // optional: toast duration (ms)
        }
      );

      // ✅ Reset form and close modal
      setAddNewUserFormData(addNewUserFormInitialState);
      setCurrentEditedID(null);
      setOpenPop(false);
    } else {
      // ❌ Show error toast
      toast.error(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error adding/updating user:", error);
    toast.error("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="flex justify-end mb-4">
      <Button onClick={() => setOpenPop(true)}>Add User</Button>

      <Dialog
        open={openPop}
        onOpenChange={() => {
          setOpenPop(false);
          setAddNewUserFormData(addNewUserFormInitialState);
          setCurrentEditedID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedID ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new user.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNewUserAction} className="grid gap-4 py-2">
            {addNewUserFormControls.map((control) => (
              <div key={control.name} className="grid gap-2">
                <Label htmlFor={control.name}>{control.label}</Label>
                <Input
                  type={control.type}
                  name={control.name}
                  id={control.name}
                  placeholder={control.placeholder}
                  required
                  value={addNewUserFormData[control.name]}
                  onChange={(e) =>
                    setAddNewUserFormData({
                      ...addNewUserFormData,
                      [control.name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setAddNewUserFormData(addNewUserFormInitialState)
                  }
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
