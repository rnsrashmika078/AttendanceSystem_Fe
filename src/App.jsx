import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Components/AppContext/AppContext.jsx";
import { AuthProvider } from "./Components/AppContext/AuthContext.jsx";
import Nav from "./Components/NavBar/NavBar.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import LandingPageV2 from "./Components/LandingPage/LandingPageV2.jsx";
import NavBarV2 from "./Components/NavBar/NavBarV2.jsx";
import Dashboard from "./Components/DashboardComponents/Dashboard.jsx";
import ProtectedRoute from "./Components/RouteProtection/ProtectedRoute.jsx";
import Sidebar from "./Components/DashboardComponents/Sidebar.jsx";

function App() {
  //Temp
  const user = true;
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
          {/* <Nav/> */}
          {user ? 
            <Nav />
            :
            null
          }
            {/* <NavBarV2/> */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/1" element={<LandingPageV2 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute Route={"login"}/>}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </>
  );
}
export default App;
