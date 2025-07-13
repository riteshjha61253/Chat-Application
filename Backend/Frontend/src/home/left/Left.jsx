import LogOut from "./LogOut"
import Search from "./Search"
import Users from "./Users"

function Left() {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white">Messages</h1>
        </div>
        <Search />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-hidden">
        <Users />
      </div>

      {/* Logout positioned at bottom */}
      <LogOut />
    </div>
  )
}

export default Left
