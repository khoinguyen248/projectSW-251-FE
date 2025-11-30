import { useEffect, useState } from 'react';
import { getNotifications, markRead, markAllRead } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getNotifications();
      setList(data.notifications);
    } catch (error) {
      console.error("Lỗi lấy thông báo", error);
    }
  };

  const handleRead = async (notif) => {
    if (!notif.isRead) {
      await markRead(notif._id);
      // Cập nhật lại UI local
      setList(list.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
    }
    if (notif.relatedLink) {
      navigate(notif.relatedLink);
    }
  };
  
  const handleReadAll = async () => {
      await markAllRead();
      setList(list.map(n => ({...n, isRead: true})));
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Thông báo của bạn</h2>
        <button onClick={handleReadAll} className="text-sm text-blue-600 hover:underline">Đánh dấu tất cả đã đọc</button>
      </div>
      
      <div className="bg-white rounded shadow divide-y">
        {list.length === 0 ? (
          <p className="p-4 text-gray-500">Không có thông báo nào.</p>
        ) : (
          list.map((item) => (
            <div 
              key={item._id} 
              onClick={() => handleRead(item)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition ${item.isRead ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-600 mt-1">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;