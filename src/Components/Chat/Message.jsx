import Pusher from "pusher-js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AppContext/AuthContext";
import { testData } from "../DataSets/schedule";
import CryptoJS from "crypto-js";
import {} from "../ReduxState/CommonSlicer";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import Loader from "../Common/Loader";
const Message = () => {
  const state = useSelector((store) => store.dashboard);
  const scrollRef = useRef();
  const { token, user } = useContext(AuthContext);

  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [enterChat, setEnterChat] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [friendArray, setFriendArray] = useState([]);
  const [messageStatus, setMessageStatus] = useState("");

  const [storeFriendArray, setStoreFriendArray] = useState([]);
  const [status, setStatus] = useState();

  const [currentFriend, setCurrentFriend] = useState([""]);
  const [oldMessages, setOldMessages] = useState([]);

  const [chatId, setChatId] = useState("");
  const prevChatId = useRef(chatId);

  let email = user?.email;
  // Scroll
  useEffect(() => {
    if (messages && messages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (recipientEmail != user?.email) {
      if (recipientEmail && user?.username) {
        const recv = recipientEmail.slice(0, 5);
        const sendr = user.username.slice(0, 5);
        const combo = [recv, sendr].sort().join("");
        setChatId(combo);
      }
    }
  }, [recipientEmail, user?.username]);
  useEffect(() => {
    const pusher = new Pusher("79c6600a1d715a73b8de", {
      cluster: "ap2",
    });
    let channel;
    if (chatId !== prevChatId.current) {
      if (channel) {
        channel.unbind_all();
        if (
          pusher.connection.state !== "closing" ||
          pusher.connection.state !== "closed"
        )
          pusher.unsubscribe(`private.user.${prevChatId.current}`);
      }
    }
    if (chatId) {
      channel = pusher.subscribe(`private.user.${chatId}`);
      channel.bind("message", (data) => {
        setMessages((prev) => {
          setMessageStatus("sent");
          console.log("MESSAGE",data)
          const updatedMessage = [...prev, data];
          localStorage.setItem("messages", JSON.stringify(updatedMessage));
          setMessageStatus("");
          return updatedMessage;
        });
      });
    }
    return () => {
      if (channel) {
        channel.unbind_all();
        if (pusher.connection.state === "connected") {
          pusher.unsubscribe(`private.user.${prevChatId.current}`);
        }
        if (
          pusher.connection.state !== "closing" ||
          pusher.connection.state !== "closed"
        )
          pusher.unsubscribe(`private.user.${prevChatId.current}`);
        prevChatId.current = chatId;
      }
      if (
        pusher.connection.state !== "disconnected" &&
        pusher.connection.state !== "closing" &&
        pusher.connection.state !== "closed"
      ) {
        pusher.disconnect();
      }
    };
  }, [chatId]);

  //return old message from localstorage
  // useEffect(() => {
  //   const savedMessages = localStorage.getItem("messages");
  // }, []);
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    // Filter based on the email field
    const filter = allUsers.filter((data) => {
      return (
        data.username &&
        data.username.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filter);
  };

  const connectWithFriend = (item) => {
    setSearchValue("");
    addFriend(item.username);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    setMessageStatus("sending");
    try {
      const response = await fetch("http://localhost:8000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderEmail: user.email,
          chatId: chatId,
          message: inputMessage,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
    } catch (error) {}

    setInputMessage("");
  };

  const handleEnterChat = (item) => {
    setEnterChat(true);
    setRecipientEmail(item.username);
    setCurrentFriend(item);
    setSearchValue("");
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAllUsers");

      if (response.status === 200) {
        const students = response.data.data.students;
        const lecturers = response.data.data.lecturers;

        const combined = [...students, ...lecturers];

        setAllUsers(combined);
      }
    } catch (error) {}
  };
  const getOldMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/oldMessages/${chatId}`
      );

      if (response.status === 200) {
        // const students = response.data.data.students;
        // const lecturers = response.data.data.lecturers;

        // const combined = [...students, ...lecturers];

        // setAllUsers(combined);
        setOldMessages(response.data);
      }
    } catch (error) {}
  };
  const getAllFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllFriends/${email}`
      );

      if (response.status === 200) {
        // setFriendArray([...friendArray, ...response.data]);
        setStoreFriendArray(response.data);
      }
    } catch (error) {}
  };

  const addFriend = async (item) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/addFriend`, {
        userEmail: user?.email,
        username: item,
      });

      if (response.status === 200) {
        setStatus(
          CryptoJS.AES.encrypt(response.data.message, "123").toString()
        );
      }
    } catch (error) {}
  };

  const handleSideBarOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        getAllFriends();
      }
      return newState;
    });
  };

  useEffect(() => {
    getAllFriends();
  }, [status]);

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    console.log(messageStatus);
  });

  useEffect(() => {
    if (chatId) {
      getOldMessages();
    }
  }, [chatId]);

  return (
    <div className="relative overflow-y-hidden">
      <div className="flex flex-col h-screen overflow-y-hidden transition-all ">
        <div
          className={`border-r-1 border-gray-100 shadow-2xs absolute h-screen w-[350px] top-0 left-0 bg-gray-100  transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* overflow-y-auto h-100  */}

          <div className="overflow-y-auto h-180 overflow-x-hidden scrollbar-hidden">
            <div className="bg-gray-800 p-6.5 sticky top-0 z-50">
              <p className="text-white text-3xl">Chat</p>
            </div>
            <div className="p-4 w-full z-50 sticky top-22 bg-gray-50 shadow-2xl ">
              <input
                type="search"
                placeholder="Search Friends.."
                className="relative z-10 py-2 rounded-2xl w-full bg-gray-800 placeholder:px-4 text-white px-4"
                value={searchValue}
                onChange={handleSearch}
              ></input>
              <div
                className={`relative ${
                  searchValue
                    ? "border-0 rounded-b-2xl bg-gray-300 p-5 bottom-3 z-0"
                    : ""
                }`}
              >
                <MainFriendCard
                  data={filteredData}
                  searchValue={searchValue}
                  connectWithFriend={connectWithFriend}
                  connected={false}
                />
              </div>
              {searchValue !== "" && filteredData.length === 0 ? (
                <div className="text-center font-extralight">
                  <div>No results found!</div>
                  <div>Please refresh the page and try again</div>
                </div>
              ) : null}
            </div>
            <div className="relative z-0">
              <div className="my-5 m-5">
                <h1 className="top-5 py-2 text-xl font-extralight">
                  Connected Friends
                </h1>
                <h1 className=" text-xs font-extralight border-b-1 border-gray-300">
                  Click one of the Friend to Chat
                </h1>
              </div>
              {/* Connected Friends */}
              {/* {friendArray.length === 0 ? (
                <div className="text-center">No Connected Friends</div>
              ) : ( */}
              <div className="m-5">
                <MainFriendCard
                  data={friendArray}
                  connectWithFriend={connectWithFriend}
                  connected={true}
                  handleEnterChat={handleEnterChat}
                  storeFriendArray={storeFriendArray}
                />
              </div>
              {/* )} */}
            </div>
          </div>
          <button onClick={handleSideBarOpen}>
            <div className="bg-blue-400 text-white absolute rounded-r-2xl py-4 left-87 top-1/2">
              <div className="place-items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6 place-items-end"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
        <div
          className={`transition-all flex h-screen flex-col ${
            isOpen
              ? "ml-0 sm:ml:0 lg:ml-88 md:ml-88 xl:88"
              : "ml-0 sm:ml-0 lg:ml-0 md:ml-0 xl:ml-0"
          }`}
        >
          <div className="bg-gray-900 p-5">
            <div className="flex">
              <button className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
              <div className="flex w-full place-items-center">
                <p className="text-white font-display text-xl ">
                  {currentFriend.username}
                </p>
              </div>
              <div className="w-full flex place-items-center justify-end">
                <div className="bg-blue-500 p-2 rounded-l-2xl text-white">
                  {currentFriend.account_type}
                </div>
              </div>
            </div>
          </div>
          {/* Char Area start here */}
          <ChatArea
            messages={messages}
            currentFriend={currentFriend}
            scrollRef={scrollRef}
            chatId={chatId}
            oldMessages={oldMessages}
            loaderEnable={loaderEnable}
            setLoaderEnable={setLoaderEnable}
            messageStatus={messageStatus}
          />
          {/* <div>
            <div className="bg-red-500 p-10">asdas</div>
            {oldMessages.map((item, index) => (
              <div key={index}>{item.message}</div>
            ))}
          </div> */}

          {/* Chat Area Ends here */}
          <div className="flex flex-grow"></div>
          <div className="bg-gray-900 p-5 mt-auto">
            <div>
              {enterChat ? (
                <div className="flex justify-center gap-5 w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 m-auto">
                  <input
                    type="search"
                    placeholder="Enter your message.."
                    className="rounded-2xl w-full bg-gray-800 placeholder:px-4 text-white px-4"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" && messageStatus === "") ||
                        (e.key === "Enter" && messageStatus === "sent")
                      ) {
                        handleSendMessage();
                      }
                    }}
                  ></input>
                  <button
                    className="transition-all text-white bg-gray-800 rounded-full p-2 place-items-center hover:scale-120 active:bg-gray-500"
                    onClick={handleSendMessage}
                    disabled={
                      messageStatus === "" || messageStatus === "sent"
                        ? false
                        : true
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

const FriendCard = ({
  item,
  connectWithFriend,
  connected,
  handleEnterChat,
}) => {
  const { token, user } = useContext(AuthContext);

  return (
    <div
      className="rounded-sm flex gap-2 bg-gray-50 p-2 hover:scale-105 place-items-center justify-between border-1 border-gray-300 shadow-2xl"
      onClick={() => connected && handleEnterChat(item)}
    >
      {connected ? (
        <div className="flex justify-between w-full gap-5 mx-2">
          <div className="text-black">
            <svg
              dataSlot="icon"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="size-15 place-item-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <div className="font-display">{item.username}</div>
          <div>
            <button></button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full gap-5 mx-2">
          <div className="font-light">{item.username}</div>
          <div>
            {item?.username != user?.username ? (
              <button onClick={() => connectWithFriend(item)}>
                <svg
                  dataSlot="icon"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </button>
            ) : (
              <div>You</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
const MainFriendCard = ({
  searchValue,
  data,
  connectWithFriend,
  connected,
  handleEnterChat,
  storeFriendArray,
}) => {
  return (
    <div className="relative">
      {!connected
        ? searchValue && data.length > 0
          ? data.map((item, index) => (
              <FriendCard
                key={index}
                item={item}
                connectWithFriend={connectWithFriend}
                connected={connected}
              />
            ))
          : null
        : storeFriendArray || (storeFriendArray && storeFriendArray.length > 0)
        ? storeFriendArray.map((item, index) => (
            <FriendCard
              key={index}
              item={item}
              connectWithFriend={connectWithFriend}
              connected={connected}
              handleEnterChat={handleEnterChat}
            />
          ))
        : null}
    </div>
  );
};
const ChatArea = ({
  messages,
  currentFriend,
  scrollRef,
  chatId,
  oldMessages,
  setLoaderEnable,
  loaderEnable,
  messageStatus,
}) => {
  const secretKey = "123";
  const { token, user } = useContext(AuthContext);
  return (
    <div className={`flex overflow-y-scroll h-130 p-5`} ref={scrollRef}>
      <div className="flex-row w-full">
        {currentFriend && currentFriend.id ? (
          <div className="flex w-full flex-col items-center justify-center text-center">
            <div className="flex flex-col lg:block sm:flex-col">
              <span className="font-display text-2xl">
                You are connected with{" "}
              </span>
              <span className="text-red-500 font-display font-bold text-2xl">
                {currentFriend?.username}!
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-extralight text-gray-700">
                  end to end via pusher private channel{" "}
                </span>{" "}
                <span className="font-extralight text-sm text-gray-400 mb-5">
                  Chat ID: {CryptoJS.AES.encrypt(chatId, "123").toString()}
                </span>
                <Loader
                  enable={loaderEnable && oldMessages.length === 0}
                  primaryText={"Loading Previous Messages.."}
                  secondaryText={"May takes a little while..!"}
                  loaderColor={"bg-red-500"}
                  innerPadding={5}
                  outterPadding={4}
                  tolerance={3}
                  setLoaderEnable={setLoaderEnable}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-1 overflow-x-hidden">
            <div className="text-2xl sm:text-2xl lg:text-4xl xl:text-4xl md:text-4xl ">
              <span className="">Welcome</span>{" "}
              <span className="text-red-500 font-display font-bold">
                {user?.username}!
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mx-50 relative size-70 rotation z-[-1] flex justify-center items-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <div className="flex flex-col justify-center">
                <p className="font-display">Connect with your friends</p>
                <p className="font-light text-2xl text-gray-700">
                  end-to-end connection
                </p>
                <p className="font-extralight text-xl text-gray-500">
                  V1.0 Laravel/Pusher
                </p>
              </div>
            </div>
          </div>
        )}
        {oldMessages || (messages && oldMessages) || messages.length > 0 ? (
          [...oldMessages, ...messages].map((item, index) =>
            item.senderEmail === user?.email ? (
              <div key={index} className="flex justify-end">
                <div className="flex flex-col bg-gray-300 p-2 rounded-xl my-1">
                  <strong>You</strong>{" "}
                  <div className="flex flex-row justify-center items-center gap-10">
                    {" "}
                    <span className="font-extralight">{item.message}</span>
                    <span className="font-extralight place-items-end">
                      {messageStatus === "" ? (
                        <img
                          src="./message-sent.svg"
                          width={15}
                          height={15}
                          className=""
                        ></img>
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-start">
                <div className="flex flex-col bg-gray-300 p-2 rounded-xl my-1">
                  <strong>{currentFriend?.username}</strong>{" "}
                  <span className="font-extralight ">{item.message}</span>
                </div>
              </div>
            )
          )
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};
