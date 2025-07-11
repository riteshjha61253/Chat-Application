import React from 'react'
import useConversation from '../../zutstand/userConveration'
import { useSocketContext } from '../../context/SocketContext';

function Chatuser() {
  const {selectedConversation}=useConversation();
  const{onlineUser}=useSocketContext();
  const getOnlineUsersStatus=(userId)=>{
    return onlineUser.includes(userId)?"Online":"Offline"
  }

  return (
    <div>    <div className="Cnt" >
        <div className='avatar online ' style={{padding: '10px'}}>
            <div className="w-24 rounded-full" style={{padding: '10px'}}>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=280&h=350&q=80"
          className="inline-block size-13 rounded-full ring-0 ring-white"
        style={{ marginLeft: '10px' }}/>
        </div>
        </div>
        <div >
            <h1 className="text-white text-lg font-semibold">{selectedConversation?.fullName||"Unknown"}</h1>
            <span className="text-gray-400 text-sm">{getOnlineUsersStatus(selectedConversation?._id)}</span>
        </div>
      </div></div>
  )
}

export default Chatuser