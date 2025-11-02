"use server";

import connectDB from "@/db/dbConfig.js";
import User from "@/models/userModel.js";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// -------------------------
// ✅ Zod Schema
// -------------------------
const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .regex(/^[A-Za-z\s]+$/, "Name should not contain special characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

// -------------------------
// ✅ ADD USER
// -------------------------
export async function addUser(data) {
  await connectDB();

  try {
    const validatedData = userSchema.parse(data);
    const newCreatedUser = await User.create(validatedData);

    revalidatePath("/");

    return {
      message: "User added successfully",
      success: true,
      status: 201,
      user: JSON.parse(JSON.stringify(newCreatedUser)),
    };
  } catch (error) {
    console.error("Add user error:", error);

    if (error instanceof z.ZodError) {
      const serializedErrors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      const allMessages = serializedErrors.map((e) => e.message).join(", ");

      return {
        message: allMessages,
        success: false,
        status: 400,
        errors: serializedErrors,
      };
    }

    return {
      message: error?.message || "Internal server error",
      success: false,
      status: 500,
    };
  }
}

// -------------------------
// ✅ EDIT USER
// -------------------------
export async function editUser(userId, data) {
  await connectDB();

  try {
    const validatedData = userSchema.parse(data);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: validatedData },
      { new: true }
    );

    if (!updatedUser) {
      return {
        message: "User not found",
        success: false,
        status: 404,
      };
    }

    revalidatePath("/");
    return {
      message: "User updated successfully",
      success: true,
      status: 200,
      user: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    console.error("Edit user error:", error);

    if (error instanceof z.ZodError) {
      const serializedErrors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      const allMessages = serializedErrors.map((e) => e.message).join(", ");

      return {
        message: allMessages,
        success: false,
        status: 400,
        errors: serializedErrors,
      };
    }

    return {
      message: error?.message || "Internal server error",
      success: false,
      status: 500,
    };
  }
}

// -------------------------
// ✅ FETCH USERS
// -------------------------
export async function fetchUsers() {
  await connectDB();

  try {
    const listOfUsers = await User.find({});
    if (!listOfUsers.length) {
      return { message: "No users found", success: false, status: 404, users: [] };
    }

    return {
      message: "Users fetched successfully",
      success: true,
      status: 200,
      users: JSON.parse(JSON.stringify(listOfUsers)),
    };
  } catch (error) {
    console.error("Fetch users error:", error);
    return {
      message: error?.message || "Error fetching users",
      success: false,
      status: 500,
    };
  }
}

// -------------------------
// ✅ DELETE USER
// -------------------------
export async function deleteUser(userId) {
  await connectDB();

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return { message: "User not found", success: false, status: 404 };
    }

    revalidatePath("/");
    return {
      message: "User deleted successfully",
      success: true,
      status: 200,
      user: JSON.parse(JSON.stringify(deletedUser)),
    };
  } catch (error) {
    console.error("Delete user error:", error);
    return {
      message: error?.message || "Error deleting user",
      success: false,
      status: 500,
    };
  }
}
