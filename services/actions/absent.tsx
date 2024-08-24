import { getSession } from "@/app/lib";
import axios from "axios";
import { baseUrl } from "../constants";
import toast from "react-hot-toast";

export async function presentByNIS(nis: string) {
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
    toast.error(error.message);
  }
}
