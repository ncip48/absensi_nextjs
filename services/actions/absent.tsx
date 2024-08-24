"use client";

import axios from "axios";
import { baseUrl } from "../constants";
import { loginServices } from "./login";
import toast from "react-hot-toast";

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
        return "Absen berhasil";
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
