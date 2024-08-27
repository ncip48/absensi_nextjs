"use client";

import axios from "axios";
import { baseUrl } from "../constants";
import { loginServices } from "./login";
import toast from "react-hot-toast";
import { getSession } from "@/app/lib";

export async function presentByNIS(nis: string) {
  try {
    const response = axios.post(
      `${baseUrl}/attendances/v1/login/nis/${nis}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await loginServices({
            username: "kocak",
            password: "password",
          })}`,
        },
      }
    );
    toast.promise(response, {
      loading: "Loading ...",
      success: (data) => {
        if (data.data.status !== 200) {
          //here you can that this will throw the error from the returned data. Usually it's treated as normal thing.
          throw new Error(`Statues code ${data.status}`);
        }
        return `${data?.data?.data[0]?.student?.name} berhasil absen masuk`;
      },
      error: (e) => {
        return `Uh oh, there was an error! ${e.message}`;
      },
    });
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
}

export async function presentOutByNISwithToken(nis: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = axios.post(
      `api/present-out?nis=${nis}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.promise(response, {
      loading: "Loading ...",
      success: (data) => {
        if (data.data.status !== 200) {
          //here you can that this will throw the error from the returned data. Usually it's treated as normal thing.
          throw new Error(`Statues code ${data.status}`);
        }
        if (data.data.data[0] == null) {
          throw new Error("Siswa tidak ditemukan");
        }
        return `${data?.data?.data[0]?.student?.name} berhasil absen keluar`;
      },
      error: (e) => {
        return `${e.message}`;
      },
    });
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
}

export async function presentByNISwithToken(nis: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = axios.post(
      `api/present?nis=${nis}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.promise(response, {
      loading: "Loading ...",
      success: (data) => {
        if (data.data.status !== 200) {
          //here you can that this will throw the error from the returned data. Usually it's treated as normal thing.
          throw new Error(`Statues code ${data.status}`);
        }
        if (data.data.data[0] == null) {
          throw new Error("Siswa tidak ditemukan");
        }
        return `${data?.data?.data[0]?.student?.name} berhasil absen masuk`;
      },
      error: (e) => {
        return `${e.message}`;
      },
    });
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
}
