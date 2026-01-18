import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Proctedwraper = ({ children }) => {
  const navigate = useNavigate();
    const tokne = localStorage.getItem("ridertoken");
  useEffect(() => {
    if (!tokne) {
      navigate("/user-Login");
    }
  }, [navigate, tokne]);

  return <>{children}</>;
};

export default Proctedwraper;
