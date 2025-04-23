import { NextRequest, NextResponse } from "next/server";
import UserI from "@/types/user";
import connect from "@/db";
import Users from "@/models/Users";

type ResponseData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { user } = <{ user: UserI }>data;

  try {
    await connect();
    await Users.create(user);

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
