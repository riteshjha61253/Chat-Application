"use client"
import { CiSearch } from "react-icons/ci"
import useGetAllUsers from "../../context/useGetAllUsers"
import useConversation from "../../zutstand/userConveration"
import { useState } from "react"

function Search() {
  const [search, setSearch] = useState("")
  const [allUsers] = useGetAllUsers()
  const { setSelectedConversation } = useConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return

    const conversation = allUsers.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    } else {
      alert("User Not Found")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search conversations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </form>
  )
}

export default Search
