import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AppContext/AuthContext";
function ProtectedRoute({ Route }) {

  const { token , user } = useContext(AuthContext)
  // const [user, setUser] = useState(() => {
  //   const storeToken = localStorage.getItem("token");
  //   return storeToken ? true : false;
  // });
  // useEffect(() => {
  //   if (token) {
  //     alert(token ? true : false);
  //   }
  // }, [token]);
  return token ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
