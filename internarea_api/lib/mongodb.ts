import mongoose from 'mongoose';

type ConnectionMode = 'atlas' | 'disconnected';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  mode: ConnectionMode;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
  mode: 'disconnected' as ConnectionMode,
};

global.mongooseCache = cached;

function getDatabaseName() {
  return process.env.DB_NAME || 'internarea';
}

function buildMongoUri() {
  const directUri = process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MONGODB_URI;

  if (directUri) {
    return directUri;
  }

  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const host = process.env.MONGO_CLUSTER_HOST;
  const options = process.env.MONGO_OPTIONS || 'retryWrites=true&w=majority';

  if (!username || !password || !host) {
    return null;
  }

  return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${getDatabaseName()}?${options}`;
}

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const databaseUri = buildMongoUri();

    if (!databaseUri) {
      throw new Error('MongoDB connection settings are not configured');
    }

    cached.promise = (async () => {
      const connection = await mongoose.connect(databaseUri, {
        dbName: getDatabaseName(),
        serverSelectionTimeoutMS: 8000,
      });
      cached.mode = 'atlas';
      return connection;
    })().catch((error) => {
      cached.promise = null;
      cached.mode = 'disconnected';
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getDatabaseMode() {
  return cached.mode;
}