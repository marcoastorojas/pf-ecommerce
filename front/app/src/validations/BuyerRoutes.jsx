import { Outlet, Navigate } from "react-router-dom";
import { ADMIN_ROLE, BUYER_ROLE, SELLER_ROLE } from "./usersTypes";
const SellerRoutes = () => {
    const userType = JSON.parse(localStorage.getItem('user'))?.roleId

    return (
        userType===BUYER_ROLE || userType===SELLER_ROLE || userType === ADMIN_ROLE? <Outlet/> : <Navigate to='/'/>
    )
}

export default SellerRoutes;