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
import V2_Dashboard from "./Components/Dashboard_New/V2_Dashboard.jsx";
import DragDrop from "./Components/Dashboard_New/DragDrop.jsx";
import Test from "./Components/TS/test.js";
import MyBarChart from "./Components/DashboardComponents/Charts/MyBarChart.jsx";
import Message from "./Components/Chat/Message.jsx";
import { setIsOnline,setWidth,setTailWindSize } from "./Components/ReduxState/CommonSlicer.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setIsOnline(true));
    };

    const handleOffline = () => {
      dispatch(setIsOnline(false));
    };
    dispatch(setIsOnline(true));

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOnline);
    };
  }, []);

  useEffect(() => {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        dispatch(setWidth(newWidth));
  
        if (newWidth >= 1280) {
          dispatch(setTailWindSize("xl"));
        } else if (newWidth >= 1024) {
          dispatch(setTailWindSize("lg"));
        } else if (newWidth >= 768) {
          dispatch(setTailWindSize("md"));
        } else if (newWidth >= 640) {
          dispatch(setTailWindSize("sm"));
        } else {
          dispatch(setTailWindSize("Mobile"));
        }
      };
  
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  const user = true;
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <Nav/> */}
          {/* {user ? <Nav /> : null} */}
          {user ? null : <NavBarV2 />}

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
            </Route>
            {/* <Route
              path="/pdf"
              element={<GeneratePDF sub_code={"CIS20220"} />}
            ></Route> */}
            <Route path="/t1" element={<V2_Dashboard />}></Route>
            <Route path="/t2" element={<Test />}></Route>
            <Route path="/t3" element={<MyBarChart />}></Route>
            <Route path="/t4" element={<Message />}></Route>

            <Route path="/generator" element={<QrGenerator />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
