import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Axios from "axios";

const Dashboard = () => {
  let [msg, setMsg] = useState("");
  let [viewMsg, setViewMsg] = useState();
  const messagesEndRef = useRef(null);
  let base = "https://team-chat-app-backend.vercel.app";

  let userName = "Nitin";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let handelInputChange = (e) => {
    setMsg({ ...msg, senderName: userName, messageContent: e.target.value });
  };

  let handelSendMessage = async () => {
    await Axios.post(`${base}/api/sendMessage`, msg).then((result) => {
      console.log(result.data);
    });
  };

  let handelGetMessages = async () => {
    await Axios.get(`${base}/api/getAllMessages`).then((result) => {
      setViewMsg(result.data);
    });
  };
  useEffect(() => {
    handelGetMessages();
    scrollToBottom();
  }, [viewMsg]);

  return (
    <div className=" h-full w-full ">
      <div className=" h-[10%] w-full ">
        <Header />
      </div>
      <div className="flex flex-col gap-5 h-[80%] w-full py-10 px-5 overflow-y-scroll scroll-smooth pb-[50px]">
        {viewMsg?.map((item, index) => {
          return (
            <div
              className={`${
                item.senderName === userName ? "reply" : "recived"
              } `}
              key={index}
            >
              {" "}
              <h1 className="text-[14px] font-[600]">
                {item.senderName === userName ? "" : item.senderName}{" "}
              </h1>
              <p className="text-[14px] font-[400]">{item.messageContent}</p>
              <div ref={messagesEndRef} />
            </div>
          );
        })}
      </div>

      <div className=" h-[10%] flex items-center justify-between gap-5 custom-border-2 py-2 px-5">
        <SentimentSatisfiedOutlinedIcon />
        <input
          onChange={(e) => {
            handelInputChange(e);
          }}
          type="text"
          placeholder="Start typing..."
          className="outline-none w-full h-full "
        />
        <AttachmentOutlinedIcon />
        <button
          disabled={msg?.messageContent === ""}
          onClick={() => {
            handelSendMessage();
          }}
        >
          <SendOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
