import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongo";
import AnimeModel from "@/lib/models/anime";

export async function GET() {
  try {
    await connectToDatabase();

    const list = await AnimeModel.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(list);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.name)
      return NextResponse.json({ error: "name required" }, { status: 400 });

    await connectToDatabase();

    function ensureString(v: unknown) {
      return typeof v === "string" ? v : "";
    }

    function ensureStringArray(v: unknown) {
      if (Array.isArray(v)) return v.filter((x) => typeof x === "string");

      if (typeof v === "string")
        return v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

      return [] as string[];
    }

    function ensureBoolean(v: unknown) {
      return typeof v === "boolean" ? v : Boolean(v);
    }

    function ensureNumberOrNull(v: unknown) {
      if (v === undefined || v === null || v === "") return null;

      const n = Number(v);
      
      return Number.isFinite(n) ? n : null;
    }

    const payload = {
      name: String(body.name),
      synopsis: ensureString(body.synopsis),
      status: ensureString(body.status),
      category: ensureStringArray(body.category),
      genre: ensureStringArray(body.genre),
      origin: ensureStringArray(body.origin),
      namesOfOrigins: ensureStringArray(body.namesOfOrigins),
      isMovie: ensureBoolean(body.isMovie),
      isSerieContentAnyMovie: ensureBoolean(body.isSerieContentAnyMovie),
      moviesNames: ensureStringArray(body.moviesNames),
      lastReleasedSeason: ensureNumberOrNull(body.lastReleasedSeason),
      lastWatchedSeason: ensureNumberOrNull(body.lastWatchedSeason),
      lastWatchedEpisode: ensureNumberOrNull(body.lastWatchedEpisode),
    };

    const doc = await AnimeModel.create(payload);

    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}
