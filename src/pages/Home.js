import React, { useContext, useRef } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { ContextProvider } from "../Context";
import Dashboard from "./Dashboard";

const Home = () => {
  const provider = new GoogleAuthProvider();

  let { user, loading, error } = useContext(ContextProvider);

  let singInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex h-full w-full items-center justify-center ">
      {user ? (
        <Dashboard />
      ) : !loading ? (
        <button className="border px-4 py-2" onClick={() => singInWithGoogle()}>
          Login With Google
        </button>
      ) : (
        <img src="loader1.gif" />
      )}
    </div>
  );
};

export default Home;
