import React from 'react'
import useSendMessage from '../../context/useSendMessage'
import { useState } from 'react';

function TypeMsg() {
  const {loading,sendMessages}= useSendMessage();
  const [message,setMessage]=useState("");
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await sendMessages(message)
    setMessage("")
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex p-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-1"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
    </form>
  )
}

export default TypeMsg