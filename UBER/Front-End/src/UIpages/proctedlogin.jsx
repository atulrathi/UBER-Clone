import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("ridertoken");
  const caption = localStorage.getItem("caption");

  if (!token && !caption) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
