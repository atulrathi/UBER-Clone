import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("ridertoken");
  const caption = localStorage.getItem("caption");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  if (caption) {
    return <Navigate to="/caption-home" replace />;
  }

  return children;
};

export default PublicRoute;
