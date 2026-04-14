import { NextResponse } from "next/server";
import { runEngine } from "../../../../../src/core/engine.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url) {
      return NextResponse.json(
        { error: "Missing url" },
        { status: 400 }
      );
    }

    const result = await runEngine(url);

    return NextResponse.json({
      ok: true,
      data: result
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed"
      },
      { status: 500 }
    );
  }
}
