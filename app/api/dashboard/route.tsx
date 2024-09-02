import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    const response = await axios.get(
      `${baseUrl}/attendances/home/statistik/harian?key=0`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = response.data;
    let result;
    if (res.data) {
      result = {
        ...res,
        data: {
          tepatWaktu: res[0][0]?.data[0] ?? 0,
          terlambat: res[0][2]?.data[0] ?? 0,
          fullTime: res[0][1]?.data[0] ?? 0,
        },
      };
    } else {
      result = {
        ...res,
        data: {
          tepatWaktu: 0,
          terlambat: 0,
          fullTime: 0,
        },
      };
    }
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
      } else {
        return NextResponse.json(
          {
            message: error.message,
          },
          { status: error.response.status }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
