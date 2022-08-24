import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const SellerRoutes = () => {
    // const userType = useSelector(state => state.user.type)
    const userType = 'seldler';
    return (
        userType==='seller'? <Outlet/> : <Navigate to='/'/>
    )
}

export default SellerRoutes;