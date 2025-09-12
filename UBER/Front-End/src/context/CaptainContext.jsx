import { useState, createContext } from "react";

export const CaptainDatacontext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setcaptain] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [errors, seterrors] = useState(null);

  const updatecaptain = (captainData) => {
    setcaptain(captainData);
  };

  const value = {
    captain,
    isLoading,
    errors,
    setcaptain,
    setisLoading,
    seterrors,
    updatecaptain,
  };

  return (
    <CaptainDatacontext.Provider value={value}>
      {children}
    </CaptainDatacontext.Provider>
  );
};

export default CaptainContext;
