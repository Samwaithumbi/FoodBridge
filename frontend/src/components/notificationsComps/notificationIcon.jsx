import { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notifications/my-notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [token]);

  const handleRead = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/notifications/read/all",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Update UI immediately
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsBellClicked(!isBellClicked)}
      >
        <FaBell size={24} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Notifications Dropdown */}
      {isBellClicked && (
        <div className="absolute pl-10 right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border z-50 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between">
               <h3 className="p-3 border-b text-lg font-semibold"> Notifications</h3>
              <button className="text-red-600" onClick={handleRead}>Mark as all Read</button>
            </div>
          

          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 text-sm border-b ${
                  n.isRead ? "bg-gray-100" : "bg-yellow-50"
                }`}
              >
                <p className="font-bold text-gray-800">{n.title}</p>
                <p className="text-gray-600">{n.message}</p>
                <small className="text-gray-500 block mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
