import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [title, setTitle] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [accountType, setAccountType] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(false); //Get Online or offline status
  const [toggler, setToggler] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const [messageBody, setMessageBody] = useState("");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        activeTab,
        setActiveTab,
        title,
        updateTitle,
        user,
        setUser,
        accountType,
        setAccountType,
        onlineStatus,
        setOnlineStatus,
        toggler,
        setToggler,
        messageBody,
        setMessageBody,
        isSideBarOpen,
        setIsSideBarOpen,
        qrCode,
        setQrCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
