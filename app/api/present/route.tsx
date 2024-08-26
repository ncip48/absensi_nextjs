import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const nis = req.nextUrl.searchParams.get("nis");
    const response = await axios.post(
      `${baseUrl}/attendances/v1/login/nis/${nis}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
