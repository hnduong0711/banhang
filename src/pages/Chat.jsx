import Header from '../components/Header';

function Chat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Chat với Admin</h1>
        <div className="bg-white p-4 rounded shadow h-64 overflow-y-auto mb-4">
          <p className="text-gray-800">Admin: Xin chào!</p>
        </div>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="w-full p-2 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
        />
      </div>
    </div>
  );
}

export default Chat;