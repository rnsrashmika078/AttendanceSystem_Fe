import { useContext } from "react";
import "./landingpage.css"
import { AuthContext } from "../AppContext/AuthContext";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/dashboard')
  };
  return (
    <>
      {/* <Nav/> */}

      <div className="main">
        <section className="home">
          <div className="focus-content">
            <div className="home-content">
              <h1>REACT VITE PROJECT</h1> {/*three word long*/}
              <h3>React Project Using Latest VITE</h3>
              <p>
                VITE is the Latest and Full Optimized Alternative to CRA aka
                Create-react-app
              </p>
              <button onClick={handleLoginClick} className="btn-lp">
                {token
                  ? "GO TO DASHBOARD"
                  : "REGISTER NOW!"}
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
}
export default LandingPage;
