import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ADMIN_ROLE, BUYER_ROLE, SELLER_ROLE } from "./usersTypes";
const SellerRoutes = () => {
    const navigate = useNavigate()
    const userType = JSON.parse(localStorage.getItem('user'))?.roleId
    // const goToHome = () => {
    // }
    useEffect(() => {
        if(!(userType===BUYER_ROLE || userType===SELLER_ROLE || userType === ADMIN_ROLE)) {
            toast.error('You have to login', {
                id: 'buyer'
            })
        }
        // navigate('/')
    }, [])
    return (
        <div>
            {userType===BUYER_ROLE || userType===SELLER_ROLE || userType === ADMIN_ROLE? <Outlet/> : <Navigate to='/'/>}
        </div>
    )
}

export default SellerRoutes;