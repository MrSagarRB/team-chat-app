import React, { useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { ContextProvider } from "../Context";

const Header = () => {
  let { user, loading, error, apiBaseUrl, chatMsg } =
    useContext(ContextProvider);

  let singOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Logged out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log(user.photoURL);
  return (
    <div className="custom-border-1 h-full w-full flex justify-between items-center custom-px">
      <div>
        <Avatar
          alt="Remy Sharp"
          src={user.photoURL}
          sx={{ width: 35, height: 35 }}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[14px] font-[600] text-[#2C2C2E]">
          {" "}
          🦄 Team Unicorns
        </p>
        <p className="text-[#666668] font-[400] text-[12px]">
          {" "}
          last seen 45 minutes ago
        </p>
      </div>
      <div>
        <MoreHorizIcon
          className="text-[#666668]"
          onClick={() => singOutUser()}
        />
      </div>
    </div>
  );
};

export default Header;
