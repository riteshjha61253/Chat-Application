import User from "./User"
import useGetAllUsers from "../../context/useGetAllUsers"

function Users() {
  const [allUsers, loading] = useGetAllUsers()

  if (loading) {
    return (
      <div className="p-2">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-slate-700 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-slate-700 rounded mb-2" />
                <div className="h-3 bg-slate-700 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {allUsers.map((user, index) => (
            <User key={user._id || index} user={user} />
          ))}
        </div>
        {allUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
