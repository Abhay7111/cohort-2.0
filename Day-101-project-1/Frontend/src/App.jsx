// import React from "react"
import AppRoute from "./AppRoutes";
import "./style.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </>
  );
}

export default App;
