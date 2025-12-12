import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
const App: React.FC = () => {
  return (
     <AuthProvider>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</AuthProvider>

  );
};

export default App;
