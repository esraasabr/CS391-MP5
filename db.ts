import { MongoClient, Db, Collection } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("MongoDB URI is missing");
}

const DB_NAME = "cs391-url-shortener";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
    }
    if (!db) {
        db = client.db(DB_NAME);
    }
    return db;
}

export const ENTRIES_COLLECTION = "entries";

export default async function getCollection(
    collectionName: string,
): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}
