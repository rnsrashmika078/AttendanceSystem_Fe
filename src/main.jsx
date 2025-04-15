import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./Components/AppContext/AppContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/ReduxState/store.js";
createRoot(document.getElementById("root")).render(

  
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);


