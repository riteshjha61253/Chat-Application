import React, { useState, useEffect } from "react";
import useConversation from "../zutstand/userConveration";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (selectedConversation && selectedConversation._id) {
        try {
          const token = localStorage.getItem("token"); // or from context/state
          const res = await fetch(
            `https://chat-application-j0m9.onrender.com/user/message/get/${selectedConversation._id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          setMessage(data);
        } catch (error) {
          console.error("Error in getting messages", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
}

export default useGetMessage;
