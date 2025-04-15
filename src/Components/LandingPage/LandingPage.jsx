import { useContext } from "react";
import "./landingpage.css";
import { AuthContext } from "../AppContext/AuthContext";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/dashboard");
  };
  return (
    <>
      {/* <Nav/> */}

      <div className="main">
        <section className="home">
          <div className="focus-content">
            <div className="home-content">
              <h1>UNIVERSITY ATTENDANCE SYSTEM</h1> {/*three word long*/}
              <h3>Track, Analyze, Attend</h3>
              <p>
                Keep attendance records, track and analyze data in real-time.
              </p>
              <button onClick={handleLoginClick} className="btn-lp">
                {token ? "GO TO DASHBOARD" : "GET STARTED!"}
              </button>
            </div>
          </div>
          <div className="image-home">
            <div className="home-img">
              <img src="./vm2.png"></img>
            </div>
            <div className="rhombus"></div>
          </div>
        </section>
      </div>
    </>
  );
};
export default LandingPage;
