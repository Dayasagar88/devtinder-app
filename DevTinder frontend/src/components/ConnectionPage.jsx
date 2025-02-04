import { MessageCircle, Trash, X } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ConnectionPage = ({isOpen,onClose}) => {
  const connections = useSelector(store => store?.connections)




    const handleChat = () => {

    }
    const handleRemove = () => {
        
    }
  return (
    <div
  className={`fixed inset-0 bg-gray-900 md:px-0 px-2 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
    isOpen ? "opacity-100 z-50" : "opacity-0 -z-10"
  }`}
>
  <div className="container mx-auto max-w-md mt-20 p-6 bg-white rounded-lg shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-700">Your Connections</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
    {connections?.length > 0 ? (
      <div className="space-y-4">
        {connections?.map((connection) => (
          <div
            key={connection?._id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={connection?.photoUrl || "/placeholder.svg"}
                alt={connection?.firstName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-700">
                  {connection?.firstName} {connection?.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {connection?.profession}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleChat(connection?._id)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleRemove(connection?._id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <p className="text-gray-700 font-semibold">
          You have no connections yet. Start connecting!
        </p>
      </div>
    )}
  </div>
</div>

  )
}

export default ConnectionPage