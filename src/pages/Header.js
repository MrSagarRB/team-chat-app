import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const Header = () => {
  return (
    <div className="custom-border-1 h-full w-full flex justify-between items-center custom-px">
      <div>
        {" "}
        <AvatarGroup>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 35, height: 35 }}
          />
          <Avatar
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 35, height: 35 }}
          />
          <Avatar
            alt="Agnes Walker"
            src="/static/images/avatar/4.jpg"
            sx={{ width: 35, height: 35 }}
          />
        </AvatarGroup>
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
        <MoreHorizIcon className="text-[#666668]" />
      </div>
    </div>
  );
};

export default Header;
