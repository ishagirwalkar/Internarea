import mongoose from 'mongoose';

type ConnectionMode = 'atlas' | 'local' | 'disconnected';

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

function getLocalDatabaseUri() {
  return process.env.LOCAL_MONGO_URI || `mongodb://127.0.0.1:27017/${getDatabaseName()}`;
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

function shouldUseLocalFallback() {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  return process.env.ENABLE_LOCAL_DB_FALLBACK !== 'false';
}

function buildConnectionErrorMessage(error: unknown, context = 'MongoDB Atlas') {
  const details = error instanceof Error ? error.message : String(error);

  return `Could not connect to ${context}. Add the current public IP to Atlas Network Access and verify the connection string. ${details}`;
}

async function connectWithUri(uri: string, mode: ConnectionMode) {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  const connection = await mongoose.connect(uri, {
    dbName: getDatabaseName(),
    serverSelectionTimeoutMS: 8000,
  });

  cached.mode = mode;
  return connection;
}

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const databaseUri = buildMongoUri();
    const localUri = getLocalDatabaseUri();

    if (!databaseUri) {
      if (!shouldUseLocalFallback()) {
        throw new Error('MongoDB connection settings are not configured');
      }

      cached.promise = connectWithUri(localUri, 'local').catch((error) => {
        cached.promise = null;
        cached.mode = 'disconnected';
        throw error;
      });
    } else {
      cached.promise = (async () => {
        try {
          const connection = await connectWithUri(databaseUri, 'atlas');
          return connection;
        } catch (error) {
          if (!shouldUseLocalFallback()) {
            throw new Error(buildConnectionErrorMessage(error));
          }

          try {
            return await connectWithUri(localUri, 'local');
          } catch (fallbackError) {
            throw new Error(`${buildConnectionErrorMessage(error)} Fallback also failed: ${buildConnectionErrorMessage(fallbackError, 'local MongoDB')}`);
          }
        }
      })().catch((error) => {
        cached.promise = null;
        cached.mode = 'disconnected';
        throw error;
      });
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getDatabaseMode() {
  return cached.mode;
}