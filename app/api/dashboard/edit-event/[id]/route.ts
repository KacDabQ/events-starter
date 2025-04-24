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
  const data = await request.json();
  const { event } = data;

  try {
    await connect();
    const eventFromDb = await Events.findById(params.id);

    if (!eventFromDb) {
      return NextResponse.json<ResponseData>(
        { success: false },
        { status: 404 }
      );
    }

    eventFromDb.name = event.name;
    eventFromDb.desc = event.desc;
    eventFromDb.date = event.date;
    eventFromDb.url = event.url;
    eventFromDb.price = event.price;
    eventFromDb.city = event.city;
    await eventFromDb.save();

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
