import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongo";
import AnimeModel from "@/lib/models/anime";
import mongoose from "mongoose";

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1] ?? "";
  if (!isValidId(id))
    return NextResponse.json({ error: "invalid id" }, { status: 400 });

  try {
    await connectToDatabase();

    const doc = await AnimeModel.findById(id).lean();

    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });

    return NextResponse.json(doc);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1] ?? "";

  if (!isValidId(id))
    return NextResponse.json({ error: "invalid id" }, { status: 400 });

  try {
    const body = await req.json();

    await connectToDatabase();

    const updated = await AnimeModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        synopsis: body.synopsis ?? null,
        category: Array.isArray(body.category) ? body.category : [],
        genre: Array.isArray(body.genre) ? body.genre : [],
        origin: Array.isArray(body.origin) ? body.origin : [],
        isMovie: Boolean(body.isMovie),
        status: typeof body.status === "string" ? body.status : "",
        lastWatchedSeason: body.lastWatchedSeason ?? null,
        lastWatchedEpisode: body.lastWatchedEpisode ?? null,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated)
      return NextResponse.json({ error: "not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1] ?? "";

  if (!isValidId(id))
    return NextResponse.json({ error: "invalid id" }, { status: 400 });

  try {
    await connectToDatabase();

    const removed = await AnimeModel.findByIdAndDelete(id).lean();

    if (!removed)
      return NextResponse.json({ error: "not found" }, { status: 404 });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}
