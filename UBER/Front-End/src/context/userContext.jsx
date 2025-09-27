import { distance } from "framer-motion";
import { useState, createContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    id:'',
    fullname: {
      Firstname: "",
      Lastname: ""
    },
    email: "",
    payment:'UPI',
    distance:'',
      duration:'',
      fare:'',
    selectedVehicle:''
  });

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
