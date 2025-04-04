import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Components/AppContext/AppContext.jsx";
import {
  AuthContext,
  AuthProvider,
} from "./Components/AppContext/AuthContext.jsx";
import Nav from "./Components/NavBar/NavBar.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import LandingPageV2 from "./Components/LandingPage/LandingPageV2.jsx";
import NavBarV2 from "./Components/NavBar/NavBarV2.jsx";
import Dashboard from "./Components/DashboardComponents/Dashboard.jsx";
import ProtectedRoute from "./Components/RouteProtection/ProtectedRoute.jsx";
import Sidebar from "./Components/DashboardComponents/Sidebar.jsx";
import Card from "./Components/Common/Card.jsx";
import Gemini from "./Components/DashboardComponents/Gemini.jsx";
import QrScanner from "./Components/DashboardComponents/QR/QrScanner.jsx";
import QrGenerator from "./Components/DashboardComponents/QR/QrGenerator.jsx";
import GeneratePDF from "./Components/DashboardComponents/QR/GeneratePDF.jsx";
import { useContext } from "react";
import Test from "./Components/DashboardComponents/QR/Test.jsx";
import Timer from "./Components/DashboardComponents/QR/Timer.jsx";
import V2_Dashboard from "./Components/Dashboard_New/V2_Dashboard.jsx";
import DragDrop from "./Components/Dashboard_New/DragDrop.jsx";
import DragCanvas from "./Components/Dashboard_New/Canvas.jsx";

function App() {
  //Temp
  const user = true;
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <Nav/> */}
          {/* {user ? <Nav /> : null} */}
          {/* <NavBarV2/> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/1" element={<LandingPageV2 />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register lec_code={"lec100"} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai" element={<Gemini />}></Route>
              <Route path="/scanner" element={<QrScanner />}></Route>
              <Route path="/generator" element={<QrGenerator />}></Route>
            </Route>
            {/* <Route
              path="/pdf"
              element={<GeneratePDF sub_code={"CIS20220"} />}
            ></Route> */}
            <Route path="/t1" element={<V2_Dashboard />}></Route>
            <Route path="/t2" element={<DragDrop />}></Route>
            <Route path="/t3" element={<DragCanvas />}></Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
