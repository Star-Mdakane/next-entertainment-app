import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('MONGODB_URI is not set')

let client, db

export async function connectDB() {
    if (db) return db

    client = new MongoClient(uri)
    await client.connect()
    db = client.db('moviedb')
    return db
}