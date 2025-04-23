"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import UserI from "@/types/user";

export default function List() {
  const [users, setUsers] = useState<UserI[]>([]);

  const getUsers = async () => {
    const res = await axios.get<{ success: boolean; users: UserI[] }>(
      "/api/admin/get-users"
    );

    setUsers(res.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="mt-10">
      <ul className="mb-10">
        <li className="flex w-full text-md font-bold p-2 mb-1 border-2 border-[#a8a8a8]">
          <span className="flex-1">Nazwa</span>
          <span className="flex-1">Email</span>
          <span className="flex-1">Hasło</span>
        </li>
        {users.map((user) => {
          return (
            <li
              key={user._id}
              className="flex w-full mb-1 border-b-2 border-[#a8a8a8] p-2"
            >
              <span className="flex-1">{user.name}</span>
              <span className="flex-1">{user.email}</span>
              <span className="flex-1">{user.password}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
