import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import { ADMIN_ROLE, SELLER_ROLE } from "./usersTypes";

const SellerRoutes = () => {
    const userType = JSON.parse(localStorage.getItem("user"))?.roleId;

    useEffect(() => {
        if(!(userType===SELLER_ROLE || userType===ADMIN_ROLE)) {
            toast.error('You need to be a seller', {
                id: 'seller'
            })
        }
        // navi
    }, [])

 return userType===SELLER_ROLE || userType===ADMIN_ROLE ? <Outlet /> : <Navigate to="/" />;
};

export default SellerRoutes;
