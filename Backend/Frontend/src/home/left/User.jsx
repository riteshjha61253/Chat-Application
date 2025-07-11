"use client"
import useConversation from "../../zutstand/userConveration.js"
import { useSocketContext } from "../../context/SocketContext.jsx"

function User({ user }) {
  const { socket, onlineUser } = useSocketContext()
  const isOnline = onlineUser.includes(user._id)
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === user._id

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-800 ${
        isSelected ? "bg-blue-600 hover:bg-blue-700" : ""
      }`}
      onClick={() => {
        setSelectedConversation(user)
      }}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
          <img
            alt={user.fullName}
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=280&h=350&q=80"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextSibling.style.display = "flex"
            }}
          />
          <div
            className="w-full h-full bg-slate-700 text-white text-sm font-medium flex items-center justify-center"
            style={{ display: "none" }}
          >
            {getInitials(user.fullName)}
          </div>
        </div>
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium truncate ${isSelected ? "text-white" : "text-slate-200"}`}>{user.fullName}</h3>
          {isOnline && <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Online</span>}
        </div>
        <p className={`text-sm truncate ${isSelected ? "text-blue-100" : "text-slate-400"}`}>{user.email}</p>
      </div>
    </div>
  )
}

export default User
