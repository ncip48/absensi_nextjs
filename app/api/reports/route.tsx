import { getSession, logout } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const dateStart = req.nextUrl.searchParams.get("start");
    const dateEnd = req.nextUrl.searchParams.get("end");
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
