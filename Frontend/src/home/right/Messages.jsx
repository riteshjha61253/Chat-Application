import React from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";
import { useRef } from "react";
import { useEffect } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); 
  console.log("This is useeffect msg", messages);
  const lastMsgRef = useRef();
  useEffect(
    () => {
      setTimeout(() => {
        if (lastMsgRef.current) {
          lastMsgRef.current.scrollIntoView({ behaviour: "smooth" });
        }
      }, 100);
    },
    [ messages ]
  );
  return (
    <div
      className="msg p-4 flex-1 overflow-y-auto scrollbar-hide"
      style={{ minHeight: "75vh" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%">Say Hi To Start</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
