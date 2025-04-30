"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface UIContextType {
  openSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
  toggleSideBar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <UIContext.Provider value={{ openSideBar, setOpenSideBar, toggleSideBar }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
