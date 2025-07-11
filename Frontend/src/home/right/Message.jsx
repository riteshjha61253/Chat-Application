import React from "react";
import "./Message.css";
import { useAuth } from "../../context/AuthProvider";

function Message({ message }) {
  const [authUser] = useAuth();
  const itsMe = message.senderId === authUser?.user?._id;
  const createdAt= new Date(message.createdAt);
  const formatedTime=createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })

  return (
   <div className={`flex mb-2 ${itsMe ? "justify-end" : "justify-start"}`}>
  <div className="flex flex-col items-end max-w-xs">
    <div
      className={`px-4 py-2 rounded-lg shadow ${
        itsMe ? "bg-blue-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      {message.message}
    </div>
    <div className="chat-footer text-xs text-gray-400 mt-1 pr-1">
      {formatedTime}
    </div>
  </div>
</div>

  );
}

export default Message;
