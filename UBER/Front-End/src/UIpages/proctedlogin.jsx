import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("ridertoken");
  const caption = localStorage.getItem("caption");

  if (token) {
    return <Navigate to="/home" replace />;
  }else if (caption) {
    return <Navigate to="/caption-home" replace />;
  }else{
    return <Navigate to="/" replace />
  }

  return children;
};

export default ProtectedRoute;
