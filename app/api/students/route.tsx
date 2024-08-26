import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
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
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        return NextResponse.json(
          {
            message: "unauthorized",
          },
          { status: error.response.status }
        );
      }
    }
  }
}
