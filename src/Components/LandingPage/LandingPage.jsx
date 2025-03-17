// import { useEffect } from 'react';
import "./landingpage.css";
// import { useNavigate } from 'react-router-dom';
// import { useAppContext } from '../AppContext/AppContext.jsx';
function LandingPage() {
  // const { activeTab , setActiveTab} = useAppContext();
  // const navigate = useNavigate();

  const handleLoginClick = () => {
    // const tokenValid = localStorage.getItem('token')
    // if(tokenValid){
    //     navigate('/dashboard')
    //     setActiveTab('dashboard')
    // }
    // else{
    //     setActiveTab('login')
    //     navigate('/login');
    // }
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
                {localStorage.getItem("token")
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
