import React from "react";
import { CiSearch } from "react-icons/ci";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zutstand/userConveration";
import { useState } from "react";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      // console.log("user",user),
      // console.log("Search",search)
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      alert("User Not Found");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="ml-2 text-4xl px-4 py-2 text-white hover:bg-gray-600 rounded-full duration-300">
            <CiSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
