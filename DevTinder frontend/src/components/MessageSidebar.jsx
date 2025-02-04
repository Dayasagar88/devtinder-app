import { X } from "lucide-react"
import { useSelector } from "react-redux"



export default function MessageSidebar({ isOpen, onClose }) {
  const connections = useSelector(store => store?.connections)
  return (
    <div
  className={`fixed top-[64px] left-0 lg:w-80 w-full h-[calc(100vh-64px)] bg-[#3B3A73] shadow-lg transform transition-transform duration-300 ease-in-out ${
    isOpen ? "-translate-x-0" : "-translate-x-full"
  }`}
>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          {connections?.map((message) => (
            <div key={message._id} className="border-b pb-2">
              <div className="flex justify-between items-start">
                <span className="font-semibold">{message?.firstName} {message?.lastName}</span>
                <span className="text-xs">{message?.time || "1h"}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{message?.message || `Hey ${message?.firstName}! Whatsapp...`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
