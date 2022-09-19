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
import { useFileUpload } from "use-file-upload";
import { Modal, useModal } from "@nextui-org/react";

const Dashboard = () => {
  let { user, loading, error, apiBaseUrl, chatMsg, handelGetMessages } =
    useContext(ContextProvider);
  const [file, selectFile] = useFileUpload();
  let [allFiles, setAllFiles] = useState([]);

  const { setVisible, bindings } = useModal();
  let storageUploadRef = ref(storage, `files/file${allFiles.length + 1}`);

  let allFileRef = ref(storage, `files`);

  let [msg, setMsg] = useState();

  const bottomRef = useRef(null);

  let handelInputChange = (e) => {
    setMsg({
      ...msg,
      senderName: user.displayName,
      messageContent: e.target.value,
    });
  };

  let handelUploadFile = async () => {
    await uploadBytes(storageUploadRef, file.file);
    await getDownloadURL(storageUploadRef).then((result) => {
      setVisible(false);
      setMsg({
        ...msg,
        senderName: user.displayName,
        imgUrl: result,
      });
    });
  };

  let handelSendMessage = async (e) => {
    e.preventDefault();
    console.log(msg);
    await Axios.post(`${apiBaseUrl}/api/sendMessage`, msg)
      .then((result) => {
        setMsg({
          ...msg,
          messageContent: "",
        });
        scrollDown();
      })
      .then(() => handelGetMessages());
  };

  let scrollDown = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  scrollDown();

  console.log(msg?.imgUrl);

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
        <div>
          <Modal
            scroll
            width="300px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
          >
            <div className="h-[200px] flex items-center justify-center">
              <div className="flex items-center flex-col gap-3">
                {file ? (
                  <div>
                    <img
                      src={file.source}
                      alt="preview"
                      height="200px"
                      width="200px"
                    />
                  </div>
                ) : null}
                {file ? (
                  <button
                    onClick={() => {
                      handelUploadFile();
                    }}
                  >
                    Upload File
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      selectFile();
                    }}
                  >
                    Select File
                  </button>
                )}
              </div>
            </div>
          </Modal>
        </div>
        <div>
          {file && (
            <div>
              <img
                src={file.source}
                alt="preview"
                height="200px"
                width="200px"
              />
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handelSendMessage}>
        <div className=" h-[10%] flex items-center justify-between gap-5 custom-border-2 py-2 px-5">
          <SentimentSatisfiedOutlinedIcon
            onClick={() => {
              handelGetMessages();
            }}
          />
          <input
            value={msg?.messageContent}
            onChange={(e) => handelInputChange(e)}
            id="msgInput"
            type="text"
            placeholder="Start typing..."
            className="outline-none w-full h-full"
          />
          <AttachmentOutlinedIcon onClick={() => setVisible(true)} />
          <button type="submit">
            <SendOutlinedIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
