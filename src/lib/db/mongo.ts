import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Por favor defina a variável de ambiente MONGODB_URI");
}

declare global {
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalRef = global as unknown as typeof global & {
  _mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalRef._mongooseCache) {
  globalRef._mongooseCache = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (globalRef._mongooseCache!.conn) {
    return globalRef._mongooseCache!.conn!;
  }

  if (!globalRef._mongooseCache!.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "anime",
    };
    globalRef._mongooseCache!.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((m) => m);
  }

  globalRef._mongooseCache!.conn = await globalRef._mongooseCache!.promise;
  return globalRef._mongooseCache!.conn!;
};

export default connectToDatabase;
