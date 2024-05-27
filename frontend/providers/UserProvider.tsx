"use client";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/scheme/User";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext(null);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:3000/api/user`);
      setUser(response.data as any);
    };
    if (session) {
      getUser();
    }
  }, [session]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
