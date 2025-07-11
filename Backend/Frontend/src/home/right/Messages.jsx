"use client"
import Message from "./Message"
import useGetMessage from "../../context/useGetMessage"
import Loading from "../../components/Loading"
import { useRef } from "react"
import { useEffect } from "react"
import useGetSocketMessage from "../../context/useGetSocketMessage"
import useConversation from "../../zutstand/userConveration"

function Messages() {
  const { loading, messages } = useGetMessage()
  const { selectedConversation } = useConversation()
  useGetSocketMessage()

  const lastMsgRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }, [messages])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex-1 bg-slate-900 overflow-y-auto">
      <div className="p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">👋</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Say hello to {selectedConversation?.fullName}</h3>
            <p className="text-slate-400">Start your conversation by sending a message</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId

              return (
                <div key={message._id} ref={lastMsgRef}>
                  <Message message={message} showAvatar={showAvatar} />
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Messages
