import React, { useState, useEffect } from "react";
import UserCard from "./component/card";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError("تعذر جلب البيانات. تأكد من اتصال الإنترنت.");
        document.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("هل أنت متأكد من حذف هذا المستخدم؟");
    if (isConfirmed) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 font-medium">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50  p-4 md:p-10 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            دليل المستخدمين
          </h1>
          <p className="text-slate-500 text-lg">إدارة البيانات والبحث</p>
        </header>

        <div className="max-w-2xl mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="ابحث عن طريق الاسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 bg-white rounded-2xl shadow-sm border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <UserCard key={u.id} user={u} onDelete={handleDelete} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-xl font-medium">
                {" "}
                لا توجد نتيجة!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
