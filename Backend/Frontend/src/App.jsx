import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Left from "../src/home/left/Left.jsx";
import Right from "../src/home/right/Right.jsx";
import Search from "./home/left/Search";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
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
              <div className="flex h-screen bg-slate-900">
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
