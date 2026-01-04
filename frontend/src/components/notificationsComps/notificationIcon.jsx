import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import api from "../../apis/axios"; 

const NotificationBell = () => {
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/notifications/my-notifications", {
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
      await api.put(
        "/api/notifications/read/all",
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
        <div className="absolute right-0 pl-10 mt-2  w-90 m-auto  bg-white shadow-xl rounded-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <button
              className="text-sm text-red-600 hover:text-red-700 font-medium"
              onClick={handleRead}
            >
              Mark all as Read
            </button>
          </div>

          {/* Body */}
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">
              No notifications yet.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`px-4 py-3 text-sm border-b transition 
                  ${n.isRead ? "bg-gray-50" : "bg-yellow-50"} 
                  hover:bg-gray-100 cursor-pointer`}
              >
                <p className="font-semibold text-gray-800">{n.title}</p>
                <p className="text-gray-600 mt-0.5">{n.message}</p>

                <small className="text-gray-500 block mt-2 text-xs">
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
