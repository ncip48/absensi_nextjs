"use client";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession } from "@/app/lib";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getStudents() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await fetch(`${baseUrl}/students/v1/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("result", result);
    if (result.status !== 200) {
      toast.error(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}
