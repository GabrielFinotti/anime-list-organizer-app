import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnime extends Document {
  name: string;
  synopsis: string;
  status: string;
  category: string[];
  genre: string[];
  origin: string[];
  namesOfOrigins?: string[];
  isMovie: boolean;
  isSerieContentAnyMovie?: boolean;
  moviesNames?: string[];
  lastReleasedSeason?: number | null;
  lastWatchedSeason?: number | null;
  lastWatchedEpisode?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const AnimeSchema = new Schema<IAnime>(
  {
    name: { type: String, required: true, index: true },
    synopsis: { type: String, default: "" },
    category: { type: [String], default: [] },
    genre: { type: [String], default: [] },
    origin: { type: [String], default: [] },
    isMovie: { type: Boolean, default: false },
    status: { type: String, default: "" },
    namesOfOrigins: { type: [String], default: [] },
    isSerieContentAnyMovie: { type: Boolean, default: false },
    moviesNames: { type: [String], default: [] },
    lastReleasedSeason: { type: Number, default: null },
    lastWatchedSeason: { type: Number, default: null },
    lastWatchedEpisode: { type: Number, default: null },
  },
  { timestamps: true }
);

const AnimeModel: Model<IAnime> =
  (mongoose.models?.Anime as mongoose.Model<IAnime>) ||
  mongoose.model<IAnime>("Anime", AnimeSchema);

export default AnimeModel;
