import React from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Messages from "./Messages";
import TypeMsg from "./TypeMsg";
import Loading from "../../components/Loading";

function Right() {
 
  return (
    <div className="w-[70%]  bg-gray-800 text-white">
      <Chatuser />
      <div style={{ height: "75vh" }} className="flex-1 overflow-y-auto">
        <Messages />
        {/* <Loading/> */}
      </div>
      <TypeMsg />
    </div>
  );
}

export default Right;
