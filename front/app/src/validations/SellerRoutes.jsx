import { Outlet, Navigate } from "react-router-dom";

const SellerRoutes = () => {
 const userType = JSON.parse(localStorage.getItem("user"))?.roleId;

 return true ? <Outlet /> : <Navigate to="/" />;
};

export default SellerRoutes;
