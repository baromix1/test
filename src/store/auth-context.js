import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  userId: "",
  username: "",
  commId: "",
  commName: "",
  userIsLoggedIn: false,
  userType: "",
  login: (userId, username, commId, commName, userType) => {},
  logout: () => {},
});

const retrieveStoredDatas = () => {
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const storedCommId = localStorage.getItem("commId");
  const storedCommName = localStorage.getItem("commName");
  const storedUserType = localStorage.getItem("userType");
  return {
    storedUserId,
    storedUsername,
    storedCommId,
    storedCommName,
    storedUserType,
  };
};

export const AuthContextProvider = (props) => {
  const data = retrieveStoredDatas();
  let initialUserId;
  let initialUsername;
  let initialCommId;
  let initialCommName;
  let initialUserType;
  if (data) {
    initialUserId = data.storedUserId;
    initialUsername = data.storedUsername;
    initialCommId = data.storedCommId;
    initialCommName = data.storedCommName;
    initialUserType = data.storedUserType;
  }
  const [userId, setUserId] = useState(initialUserId);
  const [username, setUsername] = useState(initialUsername);
  const [commId, setCommId] = useState(initialCommId);
  const [commName, setCommName] = useState(initialCommName);
  const [userType, setUserType] = useState(initialUserType);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    setUserIsLoggedIn(!!userId);
  }, [userId]);

  const loginHandler = (userId, username, commId, commName, userType) => {
    setUserId(userId);
    setUsername(username);
    setCommId(commId);
    setCommName(commName);
    setUserIsLoggedIn(true);
    setUserType(userType);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("commId", commId);
    localStorage.setItem("commName", commName);
    localStorage.setItem("userType", userType);
  };

  const logoutHandler = () => {
    setUserIsLoggedIn(false);
    setUserId(null);
    setUsername(null);
    setCommId(null);
    setCommName(null);
    setUserType(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("commId");
    localStorage.removeItem("commName");
    localStorage.removeItem("userType");
  };

  const contextValue = {
    userId: userId,
    username: username,
    commId: commId,
    commName: commName,
    userIsLoggedIn: userIsLoggedIn,
    userType: userType,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
