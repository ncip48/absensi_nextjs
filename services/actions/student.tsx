"use server";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession, logout } from "@/app/lib";
import axios from "axios";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getStudents() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/students/v1/show`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return [];
    } else {
      return result.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        // await logout();
        toast.error(error.message);
        return;
      }
    }
    toast.error(error.message);
    return;
  }
}
