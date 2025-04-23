import { NextRequest, NextResponse } from "next/server";
import UserI from "@/types/user";
import connect from "@/db";
import Users from "@/models/Users";

type ResponseData = {
  success: boolean;
  users?: UserI[];
};

export async function GET() {
  try {
    await connect();
    const users = await Users.find();

    return NextResponse.json<ResponseData>({ success: true, users });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
