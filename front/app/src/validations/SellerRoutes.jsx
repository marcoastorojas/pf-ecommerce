import { Outlet, Navigate } from "react-router-dom";
const SellerRoutes = () => {
    const userType = JSON.parse(localStorage.getItem('user'))?.roleId

    return (
        userType==='90cde201-1098-44ea-b2bf-b430421eeda8'? <Outlet/> : <Navigate to='/'/>
    )
}

export default SellerRoutes;