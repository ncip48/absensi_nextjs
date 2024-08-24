"use server";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession, logout } from "@/app/lib";
import axios from "axios";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getAttendances() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/attendances/v1/show`, {
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
        await logout();
        return;
      }
    }
    toast.error(error.message);
    return;
  }
}

export async function getAttendanceToday() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/attendances/v1/today`, {
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
        await logout();
        return;
      }
    }
    toast.error(error.message);
    return;
  }
}

export async function getAttendanceRange(dateStart: string, dateEnd: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(
      `${baseUrl}/attendances/v1/range?start=${dateStart}&end=${dateEnd}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
        await logout();
        return;
      }
    }
    toast.error(error.message);
    return;
  }
}
