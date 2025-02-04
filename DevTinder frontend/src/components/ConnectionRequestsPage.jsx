import { REVIEW_CONNECTION_REQUEST_URL } from "@/constants/routes";
import { addConnectionRequest } from "@/utils/connectionRequestSlice";
import axios from "axios";
import { UserMinusIcon, UserPlusIcon, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ConnectionRequestsPage({
  isOpen,
  onClose,
  getConnections,
}) {
  const connectionRequests = useSelector((store) => store?.connectionRequests);
  const dispatch = useDispatch();

  const handleRequest = async (value, userId) => {
    try {
      const res = await axios.post(
        REVIEW_CONNECTION_REQUEST_URL + `/${value}` + `/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedConnectionRequests = connectionRequests.filter(
          (req) => req._id != userId
        );
        dispatch(addConnectionRequest(updatedConnectionRequests));
        toast.success(res.data?.message);
        if (value === "accepted") getConnections();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Somthing went wrong");
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity md:px-0 px-2 duration-300 ${
        isOpen ? "opacity-100 z-50" : "opacity-0 -z-10"
      }`}
    >
      <div className="container mx-auto max-w-md mt-20 p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            Connection Requests
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {connectionRequests?.length > 0 ? (
          <div className="space-y-4">
            {connectionRequests?.map((request) => (
              <div
                key={request?._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={request?.photoUrl || "/placeholder.svg"}
                    alt={request?.firstName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      {request?.firstName} {request?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request?.profession}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleRequest("accepted", request?._id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                  >
                    <UserPlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => handleRequest("rejected", request?._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                  >
                    <UserMinusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-700 font-semibold">
              No pending connection requests
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
