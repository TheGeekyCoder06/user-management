"use server";

import connectDB from "@/db/dbConfig.js";
import User from "@/models/userModel.js";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export async function addUser(data) {
  await connectDB();

  try {
    const validatedData = userSchema.parse(data);
    const newCreatedUser = await User.create(validatedData);
    console.log("New user created:", newCreatedUser);
    revalidatePath("/");
    // ✅ Return a plain object (Server Action standard)
    return {
      message: "User added successfully",
      success: true,
      status: 201,
      user: JSON.parse(JSON.stringify(newCreatedUser)),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        success: false,
        status: 400,
        errors: error.errors,
      };
    }

    console.error("Error adding user:", error);
    return {
      message: "Error adding user",
      success: false,
      status: 500,
      error: error.message,
    };
  }
}

// fetch users action

export async function fetchUsers() {
    await connectDB();

    try{
        const listOfUsers = await User.find({});
        if(listOfUsers){
            return{
                message: "Users fetched successfully",
                success: true,
                status: 200,
                users: JSON.parse(JSON.stringify(listOfUsers)),
            };
        }else{
            return{
                message: "No users found",
                success: false,
                status: 404,
                users: [],
            };
        }
    }catch(error){
        console.error("Error fetching users:", error);
        return {
            message: "Error fetching users",
            success: false,
            status: 500,
            error: error.message,
        };
    }
}

// edit user action
export async function editUser(userId, data) {
  await connectDB();

  try {
    const validatedData = userSchema.parse(data);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: validatedData },
      { new: true }
    );

    if (updatedUser) {
      revalidatePath("/");
      return {
        message: "User updated successfully",
        success: true,
        status: 200,
        user: JSON.parse(JSON.stringify(updatedUser)),
      };
    } else {
      return {
        message: "User not found",
        success: false,
        status: 404,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        success: false,
        status: 400,
        errors: error.errors,
      };
    }

    console.error("Error updating user:", error);
    return {
      message: "Error updating user",
      success: false,
      status: 500,
      error: error.message,
    };
  }
}

// delete user action

export async function deleteUser(userId){
  await connectDB();

  try{
    const deletedUser = await User.findByIdAndDelete(userId);
    if(deletedUser){
      revalidatePath("/");
      return{
        message: "User deleted successfully",
        success: true,
        status: 200,
        user: JSON.parse(JSON.stringify(deletedUser)),
      };
    }else{
      return{
        message: "User not found",
        success: false,
        status: 404,
      };
    }
  }catch(error){
    console.error("Error deleting user:", error);
    return {
      message: "Error deleting user",
      success: false,
      status: 500,
      error: error.message,
    };
  }
}
