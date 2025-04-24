import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Events from "@/models/Events";

type ResponseData = {
  success: boolean;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("params", params);
    await connect();
    console.log("connected to db");
    const eventFromDb = await Events.findByIdAndDelete(params.id);

    if (!eventFromDb) {
      return NextResponse.json<ResponseData>(
        { success: false },
        { status: 404 }
      );
    }

    console.log("deleted eventFromDb", eventFromDb);

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json<ResponseData>({ success: false }, { status: 500 });
  }
}
