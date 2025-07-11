import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await fetch("http://localhost:3000/user/allUsers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
