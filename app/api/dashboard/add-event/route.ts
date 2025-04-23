import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Events from "@/models/Events";

type ResponseData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { event } = data;

  try {
    await connect();
    await Events.create(event);

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
