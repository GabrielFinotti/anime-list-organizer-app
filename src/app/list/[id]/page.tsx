import AnimeDetails from "@/components/layout/cards/AnimeDetails";
import connectToDatabase from "@/lib/db/mongo";
import AnimeModel from "@/lib/models/anime";
import mongoose from "mongoose";

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

const Details = async ({ params }: { params?: Promise<{ id?: string }> }) => {
  const resolved = params ? await params : undefined;
  const id = resolved?.id ?? "";

  if (!isValidId(id)) {
    return (
      <main>
        <p>ID inválido</p>
      </main>
    );
  }

  await connectToDatabase();

  const doc = await AnimeModel.findById(id).lean();

  if (!doc) {
    return (
      <main>
        <p>Anime não encontrado</p>
      </main>
    );
  }

  const payload = {
    _id: String(doc._id),
    name: doc.name,
    synopsis: doc.synopsis,
    category: doc.category,
    genre: doc.genre,
    origin: doc.origin,
    namesOfOrigins: doc.namesOfOrigins,
    isMovie: doc.isMovie,
    isSerieContentAnyMovie: doc.isSerieContentAnyMovie,
    moviesNames: doc.moviesNames,
    lastReleasedSeason: doc.lastReleasedSeason,
    lastWatchedSeason: doc.lastWatchedSeason,
    lastWatchedEpisode: doc.lastWatchedEpisode,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    status: doc.status,
  };

  console.log(payload);

  return (
    <main>
      <AnimeDetails anime={payload} />
    </main>
  );
};

export default Details;
