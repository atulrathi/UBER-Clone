import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Proctedwraper = ({ children }) => {
  const navigate = useNavigate();
    const tokne = localStorage.getItem("token");
  useEffect(() => {
    if (!tokne) {
      navigate("/caption-Login");
    }
  }, [navigate, tokne]);

  return <>{children}</>;
};

export default Proctedwraper;
