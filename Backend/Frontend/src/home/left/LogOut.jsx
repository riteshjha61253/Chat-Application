"use client"

import { Power } from "lucide-react"
import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zutstand/userConveration"

function LogOut() {
  const { socket } = useSocketContext()
  const { setSelectedConversation } = useConversation()

  const handleLogout = () => {
    // 1. Clear localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // 2. Clear Zustand conversation state
    setSelectedConversation(null)

    // 3. Disconnect socket
    socket?.disconnect()

    // 4. Redirect to login page
    window.location.href = "/signIn"
  }

  return (
    <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-900">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 hover:border-red-500/40 rounded-lg transition-all duration-200 group"
      >
        <Power className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
        <span className="text-red-400 group-hover:text-red-300 font-medium text-sm transition-colors">Sign Out</span>
      </button>
    </div>
  )
}

export default LogOut
