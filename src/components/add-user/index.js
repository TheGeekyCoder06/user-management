"use client";

import { useState, useContext } from "react";
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
import { addUser, editUser } from "@/actions/index.js";
import { UserContext } from "@/context/index.js";
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

    // ✅ Basic empty-field validation
    const isValid = Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() !== ""
    );
    if (!isValid) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Call appropriate action (Add or Edit)
      const result = currentEditedID
        ? await editUser(currentEditedID, addNewUserFormData)
        : await addUser(addNewUserFormData);

      if (result?.success) {
        toast.success(
          currentEditedID
            ? "User updated successfully!"
            : "User added successfully!",
          {
            description: `Name: ${addNewUserFormData.name} | Email: ${addNewUserFormData.email}`,
            duration: 4000,
          }
        );

        // ✅ Reset form and close modal
        setAddNewUserFormData(addNewUserFormInitialState);
        setCurrentEditedID(null);
        setOpenPop(false);
      } else {
        // ❌ Handle validation errors
        if (Array.isArray(result?.errors)) {
          result.errors.forEach((err) => toast.error(err.message));
        } else {
          toast.error(result?.message || "Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Reset & close dialog safely
  const handleDialogClose = () => {
    setOpenPop(false);
    setAddNewUserFormData(addNewUserFormInitialState);
    setCurrentEditedID(null);
  };

  return (
    <div className="flex justify-end mb-4">
      <Button onClick={() => setOpenPop(true)}>Add User</Button>

      <Dialog open={openPop} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedID ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {currentEditedID
                ? "Update the user details below."
                : "Fill out the details below to create a new user."}
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
                  onClick={handleDialogClose}
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
