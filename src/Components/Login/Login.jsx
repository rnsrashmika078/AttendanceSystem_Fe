import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import DropDown from "../Common/DropDown";
import { useContext, useEffect, useState } from "react";
import ErrorComponent from "../Notification/ErrorComponent";
import Add from "../Notification/Add";
import { AuthContext } from "../AppContext/AuthContext";
import CryptoJS from "crypto-js";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // const baseURL = "http://192.168.43.230:8000"
  const { token, setToken, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [onSuccess, setOnSuccess] = useState(false);
  const navigate = useNavigate();
  const [errorMsgTitle, setErrorMsgTitle] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    account_type: "",
  });

  // Encryption Alogirth -> AES
  const encrypt = (secretKey, data) => {
    const encryptionToken = CryptoJS.AES.encrypt(
      data.token,
      secretKey
    ).toString();

    const encryptionUser = CryptoJS.AES.encrypt(
      JSON.stringify(data.user),
      secretKey
    ).toString();
    localStorage.setItem("token", encryptionToken);
    localStorage.setItem("user", encryptionUser);
  };

  const handleOnChange = (e) => {
    setError("");
    setErrorMsgTitle("");
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const setNotifierVisibility = (stat) => {
    if (!stat) {
      setOnSuccess(false);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setErrorMsgTitle("");

    if (!loginDetails.email) {
      setError("Email field is Required!");
      return;
    }
    if (!loginDetails.password) {
      setError("Password field is Required!");
      return;
    }
    if (!loginDetails.account_type) {
      setError("Please Select the Account Type!");
      return;
    }
    await fetch(
      `${API_BASE_URL}${
        loginDetails?.account_type === "Student"
          ? "student_login"
          : "lecturer_login"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setOnSuccess(true);
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("user", JSON.stringify(data.user));
          encrypt("abc", data);
          setToken(data.token);
          setUser(data.user);

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
          setTimeout(() => {
            setOnSuccess(false);
          }, 2000);
        } else {
          setError(String(data.message));
          setErrorMsgTitle("User Exist");
          setOnSuccess(false);
          return;
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };
  const success = () => {
    return (
      <div>
        <Add
          messageBody={"Successfully Logged In!"}
          setNotifierVisibility={setNotifierVisibility}
        />
      </div>
    );
  };
  useEffect(() => {
    console.log(loginDetails);
  }, [loginDetails]);
  return (
    <>
      <div className=" w-auto mx-2 ">
        {onSuccess ? success() : null}
        <div className="space-y-0">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/* <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              /> */}
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Welocome Back
              </h2>
              <p className="text-center mt-1 text-sm/6 text-gray-600">
                Login to your account with login Credentials
              </p>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <InputField
                span={2}
                htmlFor="email"
                label="Email Address"
                placeholder={"Ex: abc123@gmail.com"}
                type="email"
                name={"email"}
                id="email"
                value={loginDetails.email}
                handleOnChange={handleOnChange}
              />
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <InputField
                span={2}
                htmlFor="password"
                label="Password"
                placeholder={"Ex: abc123"}
                type="password"
                name={"password"}
                id="password"
                value={loginDetails.password}
                handleOnChange={handleOnChange}
              />
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <DropDown
                span={2}
                htmlFor={"account_type"}
                label={"Account Type"}
                autoComplete={"account_type"}
                id={"account_type"}
                name={"account_type"}
                options={["Student", "Lecturer"]}
                handleOnChange={handleOnChange}
              />
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Don't have an account ?{" "}
              <Link to="/register">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Click here to Register
                </a>
              </Link>
            </p>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              {error ? (
                <ErrorComponent
                  message={error}
                  title={errorMsgTitle || "Missing Field!"}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
