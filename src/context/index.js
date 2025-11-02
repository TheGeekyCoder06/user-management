"use client";
import { createContext, useState } from "react";
import { addNewUserFormInitialState } from "@/utils/index.js";
export const UserContext = createContext(null);

export default function UserState({ children }) {
  const [currentEditedID, setCurrentEditedID] = useState(null);
  const [openPop, setOpenPop] = useState(false);
  const [addNewUserFormData, setAddNewUserFormData] = useState(
    addNewUserFormInitialState
  );
  return (
    <UserContext.Provider value={{ currentEditedID, setCurrentEditedID , openPop, setOpenPop, addNewUserFormData, setAddNewUserFormData }}>
      {children}
    </UserContext.Provider>
  );
}
