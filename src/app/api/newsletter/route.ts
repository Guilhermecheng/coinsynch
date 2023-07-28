import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const receivedData = await req.json();

    const data = {
        email: receivedData.email,
        isregistered: true,
        message: "Email successfully registered!"
    }
    return NextResponse.json(data)
}