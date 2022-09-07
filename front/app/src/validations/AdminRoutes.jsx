import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import { ADMIN_ROLE, BUYER_ROLE, SELLER_ROLE } from "./usersTypes";

const AdminRoutes = () => {
    const userType = JSON.parse(localStorage.getItem('user'))?.roleId

    useEffect(() => {
        if(!(userType === ADMIN_ROLE)) {
            toast.error("You don't have access to this page", {
                id: 'admin'
            })
        }
    }, [])
    return (
        <div>
            {userType === ADMIN_ROLE? <Outlet/> : <Navigate to='/'/>}
        </div>
    )
}

export default AdminRoutes;