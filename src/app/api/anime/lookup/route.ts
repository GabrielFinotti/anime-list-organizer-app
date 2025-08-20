import { NextResponse } from "next/server";

type AiResponse = {
  name?: string;
  synopsis?: string | null;
  category?: string[];
  genre?: string[];
  origin?: string[];
  namesOfOrigins?: string[];
  isMovie?: boolean;
  isSerieContentAnyMovie?: boolean;
  moviesNames?: string[];
  lastReleasedSeason?: number | null;
};

function ensureStringField(v: unknown): string {
  if (typeof v === "string" && v.trim() !== "") return v;
  return "Dados não encontrados";
}

function ensureNumberField(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return null;
}

function ensureStringArray(v: unknown): string[] {
  if (Array.isArray(v))
    return v.map((x) => (typeof x === "string" ? x : String(x)));
  if (typeof v === "string") {
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body?.name?.trim?.();

    if (!name)
      return NextResponse.json({ error: "name required" }, { status: 400 });

    const prompt = `Você irá pesquisar informações públicas e atualizadas sobre um anime com base no nome fornecido. Responda EXCLUSIVAMENTE com um JSON válido (apenas o JSON, sem texto adicional nem blocos de código). Use PT-BR na sinopse.

    Regras obrigatórias de formatação e fallback:
    - Retorne todas as chaves do schema abaixo (use null ou "Dados não encontrados" quando necessário).
    - Strings desconhecidas: exatamente "Dados não encontrados".
    - Números desconhecidos: null.
    - Arrays sem itens: [] (array vazio).
    - Não inclua explicações, comentários ou texto antes/depois do JSON.
    - Não use vírgulas finais (trailing commas).

    Campos QUE NÃO devem ser preenchidos pelo AI (o cliente preencherá manualmente):
    - status
    - lastWatchedSeason
    - lastWatchedEpisode

    Schema exato esperado (retorne somente este objeto JSON):
    {
    "name": "string",
    "synopsis": "string|null",
    "category": ["string", ...],
    "genre": ["string", ...],
    "origin": ["string", ...],
    "namesOfOrigins": ["string", ...],
    "isMovie": true|false,
    "isSerieContentAnyMovie": true|false,
    "lastReleasedSeason": number|null,
    "moviesNames": ["string", ...]
    }

    Regras de conteúdo e prioridade:
    - Priorize fontes públicas confiáveis (AniList, MyAnimeList, sites oficiais) ao compilar os dados.
    - Category é para demografia, genre é para generos e subgeneros
    - Origen é se o anime deriva de um manga, light novel, animer orignal, etc
    - A sinopse deve estar em PT-BR, sucinta (1-3 parágrafos), e sem instruções ao usuário.

    Siga estritamente as regras acima. Nome buscado: "${name}"`;

    const openaiResp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente que responde somente com JSON seguindo o schema fornecido.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.0,
          max_tokens: 800,
        }),
      }
    );

    if (!openaiResp.ok) {
      const t = await openaiResp.text();

      return NextResponse.json(
        { error: "OpenAI error", details: t },
        { status: 502 }
      );
    }

    const j = await openaiResp.json();
    const text = j.choices?.[0]?.message?.content ?? j.choices?.[0]?.text;

    if (!text)
      return NextResponse.json(
        { error: "no content from model" },
        { status: 502 }
      );

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first === -1 || last === -1) {
      return NextResponse.json(
        { error: "invalid response format from model" },
        { status: 422 }
      );
    }

    const jsonText = text.slice(first, last + 1);
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText) as unknown;
    } catch (err: unknown) {
      return NextResponse.json(
        { error: "json parse failed", details: String(err) },
        { status: 422 }
      );
    }

    const p = parsed as Record<string, unknown>;

    const out: AiResponse = {
      name: p?.name ? ensureStringField(p.name) : ensureStringField(name),
      synopsis:
        p?.synopsis == null
          ? "Dados não encontrados"
          : typeof p?.synopsis === "string"
          ? p.synopsis
          : "Dados não encontrados",
      category: ensureStringArray(p?.category),
      genre: ensureStringArray(p?.genre),
      origin: ensureStringArray(p?.origin),
      namesOfOrigins: ensureStringArray(p?.namesOfOrigins),
      isMovie: typeof p?.isMovie === "boolean" ? p.isMovie : false,
      isSerieContentAnyMovie:
        typeof p?.isSerieContentAnyMovie === "boolean"
          ? p.isSerieContentAnyMovie
          : false,
      lastReleasedSeason:
        p?.lastReleasedSeason != null
          ? ensureNumberField(p?.lastReleasedSeason)
          : null,
      moviesNames: ensureStringArray(p?.moviesNames),
    };

    return NextResponse.json(out);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: "internal", details: msg },
      { status: 500 }
    );
  }
}
