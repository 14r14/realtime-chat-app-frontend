import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "../axiosInstance";

import Message from "../components/Message";

import socket from "../socketIOConn";

function Index() {
  const [messages, setMessages] = React.useState([]);

  const messagesFormRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    // setError,
  } = useForm();

  const sendMessage = () => {
    const message = getValues("message");
    const messageObject = {
      message,
      userToken: localStorage.getItem("token"),
    };
    socket.emit("message", messageObject);
    setValue("message", "");
  };

  useEffect(() => {
    const getPreviousMessages = () => {
      axios.get("/msg/get-messages").then((res) => {
        setMessages(res.data.messages);
      });
    };

    socket.on("sent", (data) => {
      setMessages((prev) => [data, ...prev]);
    });

    messagesFormRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    getPreviousMessages();

    return () => {
      socket.off("sent");
    };
  }, [messagesFormRef]);

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => {
            return (
              <>
                <Message
                  key={msg.key}
                  keyForMsg={msg.key}
                  sender={msg.message.sender.username}
                  message={msg.message.msg}
                  time={msg.message.date}
                />
              </>
            );
          })}
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(sendMessage)}
          className="fixed bottom-0 w-full bg-gray-500/60 p-3 flex justify-center"
        >
          <input
            type="text"
            placeholder="Type a message..."
            {...register("message", { required: true })}
            className="w-11/12 border border-100 p-2 rounded-lg m-1 caret-sky-900 focus:ring-0 ring-0"
          />
          <button
            type="submit"
            className="bg-sky-700 p-3 rounded-lg text-white"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Index;
