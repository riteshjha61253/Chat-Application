import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Search from "./home/left/Search";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log("Console", authUser);
  return (
    <>
      {/* <SignUp/> */}
      {/* <SignIn /> */}
      {/*  */}
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />

        <Route
          path="/signIn"
          element={authUser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
