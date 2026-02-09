import React from "react";

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{user.name}</h3>
        <div className="space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-400">البريد:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-slate-400">الهاتف:</span>{" "}
            {user.phone}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(user.id)}
        className="mt-4 w-full bg-red-100 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors border border-red-100"
      >
        حذف المستخدم
      </button>
    </div>
  );
};

export default UserCard;
