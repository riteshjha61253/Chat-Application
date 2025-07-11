import Chatuser from "./Chatuser"
import Messages from "./Messages"
import TypeMsg from "./TypeMsg"
import useConversation from "../../zutstand/userConveration"

function Right() {
  const { selectedConversation } = useConversation()

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Welcome to Chat</h3>
          <p className="text-slate-400">Select a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      <Chatuser />
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <TypeMsg />
    </div>
  )
}

export default Right
