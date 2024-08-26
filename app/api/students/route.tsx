import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const storage = await getSession();
  const token = storage.user.token;
  const response = await axios.get(`${baseUrl}/students/v1/show`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}
