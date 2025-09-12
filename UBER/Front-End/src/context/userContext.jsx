import { useState, createContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    fullname: {
      Firstname: "",
      Lastname: ""
    },
    email: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
