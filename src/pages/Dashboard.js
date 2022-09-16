import React, { useContext, useRef, useState } from "react";
import Header from "./Header";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { ContextProvider } from "../Context";
import { async } from "@firebase/util";
import Axios from "axios";
import { storage } from "../firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const Dashboard = () => {
  let { user, loading, error, apiBaseUrl, chatMsg } =
    useContext(ContextProvider);

  let [msg, setMsg] = useState();
  let [file, setFile] = useState();
  let [fileCount, setFileCount] = useState(2);
  let [allFiles, setAllFiles] = useState([]);

  const bottomRef = useRef(null);
  let storageUploadRef = ref(storage, `files/file${allFiles.length + 1}`);
  let allFileRef = ref(storage, `files`);

  let handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  let handelUploadFile = async () => {
    uploadBytes(storageUploadRef, file);
    const url = await getDownloadURL(storageUploadRef);
    setMsg({
      ...msg,
      imgUrl: url,
    });
    console.log(url);
  };

  let handelInputChange = (e) => {
    setMsg({
      ...msg,
      senderName: user.displayName,
      messageContent: e.target.value,
    });
  };

  let handelSendMessage = async (e) => {
    e.preventDefault();
    console.log(msg);
    await Axios.post(`${apiBaseUrl}/api/sendMessage`, msg).then((result) => {
      // console.log(result.data);
      setMsg({
        ...msg,
        messageContent: "",
      });
      scrollDown();
    });
    // console.log(msg)
  };

  let scrollDown = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  scrollDown();

  return (
    <div className=" h-full w-full md:w-[500px] md:border">
      <div className=" h-[10%] w-full ">
        <Header />
      </div>
      <div className="flex flex-col gap-5 h-[80%] w-full py-10 px-5 overflow-x-scroll scroll-smooth pb-[50px]">
        {chatMsg?.map((item, index) => {
          return (
            <div
              className={`${
                item.senderName === user.displayName ? "reply" : "recived"
              } `}
              key={index}
            >
              {" "}
              <h1 className="text-[14px] font-[600]">
                {item.senderName === user.displayName ? "" : item.senderName}{" "}
              </h1>
              <p className="text-[14px] font-[400]">{item.messageContent}</p>
              {item.imgUrl ? (
                <a href={item.imgUrl}>
                  {" "}
                  <img src={item.imgUrl} />
                </a>
              ) : null}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
      <form onSubmit={handelSendMessage}>
        <div className=" h-[10%] flex items-center justify-between gap-5 custom-border-2 py-2 px-5">
          <input type="file" onChange={(e) => handleFileChange(e)} />
          <SentimentSatisfiedOutlinedIcon />
          <input
            value={msg?.messageContent}
            onChange={(e) => handelInputChange(e)}
            id="msgInput"
            type="text"
            placeholder="Start typing..."
            className="outline-none w-full h-full "
          />
          <AttachmentOutlinedIcon onClick={() => handelUploadFile()} />
          <button type="submit">
            <SendOutlinedIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
