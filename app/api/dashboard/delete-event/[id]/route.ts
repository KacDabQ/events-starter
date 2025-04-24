import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Events from "@/models/Events";

type ResponseData = {
  success: boolean;
};

export async function POST({ params }: { params: { id: string } }) {
  try {
    await connect();
    const eventFromDb = await Events.findById(params.id);

    if (!eventFromDb) {
      return NextResponse.json<ResponseData>({ success: false });
    }

    await eventFromDb.delete();

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
