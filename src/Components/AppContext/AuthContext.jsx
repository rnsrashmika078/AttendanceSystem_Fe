import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successTime, setSuccessTime] = useState();
  const [sessionData, setSessionData] = useState();

  const decrypt = (secretKey, encryptedToken, encryptedUser) => {
    try {
      const bytesToken = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const decryptedToken = bytesToken.toString(CryptoJS.enc.Utf8);

      const bytesUser = CryptoJS.AES.decrypt(encryptedUser, secretKey);
      const decryptedUser = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));

      return {
        token: decryptedToken,
        user: decryptedUser,
      };
    } catch (error) {
      console.error("Decryption failed", error);
      return { token: null, user: null };
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedSessionData = localStorage.getItem("session");

    if (storedToken && storedUser) {
      const { token: newToken, user: newUser } = decrypt(
        "abc",
        storedToken,
        storedUser
      );
      setToken(newToken);
      setUser(newUser);
    }
  }, []);

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("session"));

    // const storedSuccessTime = localStorage.getItem("successTime");

    if (storedSession) {
      setSessionData(storedSession);
      // setSuccessTime(storedSuccessTime);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  const exitFromBrowser = () => {
    localStorage.removeItem("session");
    setSessionData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        logout,
        isSuccess,
        successTime,
        setIsSuccess,
        setSuccessTime,
        sessionData,
        setSessionData,
        exitFromBrowser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
