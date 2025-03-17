import {  Navigate,Outlet } from 'react-router-dom';
function ProtectedRoute({Route}) {
  const user = true;
  
//   useEffect(()=>{
    
//   },[user])
return user ? <Outlet/> : <Navigate to={`/${Route}`}/>
  
}

export default ProtectedRoute
