import { connectToDatabase } from "../../lib/db";

import { NextResponse } from "next/server";
export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const all_sessions = await client
      .db("taski")
      .collection("sessions")
      .find({})
      .toArray();
    console.log(all_sessions);
    return NextResponse.json(
      { msg: "response Recieved", all_sessions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Error", error }, { status: 501 });
  }
}
export async function POST(req: Request) {
  const { client } = await connectToDatabase();
  const { categoryId, duration, date, breakDuration, pauses } =
    await req.json();
  console.log(categoryId, duration, date, breakDuration); // debugging purposes
  if (!categoryId || !duration || !breakDuration || !date) {
    return NextResponse.json(
      { msg: "Missing Required Fields" },
      { status: 400 }
    );
  }
  try {
    await client
      .db("taski")
      .collection("sessions")
      .insertOne({
        categoryId: categoryId || "67435accf05e699173e70c36",
        duration,
        breakDuration,
        pauses: pauses || [],
        date: new Date(date),
        createdAt: new Date(),
      });
    return NextResponse.json({ msg: "Data Stored Right!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Hi Fuck Me ", error }, { status: 401 });
  }
}
