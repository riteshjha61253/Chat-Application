import React from 'react'
import useConversation from '../../zutstand/userConveration.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
import './User.css'


function User({user}) {
  const {socket,onlineUser}=useSocketContext();
const isOnline =onlineUser.includes(user._id)
  const{selectedConversation,setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id === user._id;
  console.log("isSELECTED", selectedConversation?._id);

  return (
    <div>
        <div className={`Cnt hover:bg-slate-200 duration-300 ${isSelected?"bg-slate-700":""}`} onClick={()=> {setSelectedConversation(user);
          console.log("Selected User",selectedConversation,user,user._id);
          console.log("isSELECTED", selectedConversation?._id);
        }} >
      <div className="avatar-container">
  <div className="avatar" style={{ padding: '10px' }}>
    <div className="w-24 rounded-full" style={{ padding: '10px', position: 'relative' }}>
      <img
        alt=""
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=280&h=350&q=80"
        className="inline-block size-5 rounded-full ring-0 ring-white"
        style={{ marginLeft: '10px', width: '60px', height: '60px', objectFit: 'cover' }}
      />
      {isOnline && <span className="online-indicator"></span>}
    </div>
  </div>
</div>

        <div >
            <h1 className="text-white text-lg font-semibold">{user.fullName}</h1>
            <span className="text-gray-400 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  )
}

export default User