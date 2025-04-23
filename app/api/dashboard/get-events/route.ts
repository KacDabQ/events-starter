import { NextResponse } from "next/server";
import connect from "@/db";
import Events from "@/models/Events";

type ResponseData = {
  success: boolean;
  events?: any[];
};

export async function GET() {
  try {
    await connect();
    const events = await Events.find();

    return NextResponse.json<ResponseData>({ success: true, events });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
