'use client';

import { request } from "@/api/services/base.service";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const request = await fetch("http://localhost:4000/users/find");
      const response = await request.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = response.data;
      console.log(users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserById = async (id) => {
    const response = await request(`/users/find/${id}`);
    if (response.error) {
      alert("Error fetching user: " + response.message);
      return null;
    }
    return response.data;
  };

  // /users/find
  //  PORT 4000
  return (
    <h1>Hello World</h1>
  );
}
