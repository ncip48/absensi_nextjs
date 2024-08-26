"use client";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession, logout } from "@/app/lib";
import axios from "axios";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getProfile(token: string) {
  try {
    const response = await axios.get(`/api/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return null;
    } else {
      return result.data[0];
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        await logout();
        return;
      }
    }
    toast.error(error.message);
    return;
  }
}
