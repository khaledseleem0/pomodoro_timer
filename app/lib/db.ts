import { MongoClient } from 'mongodb';
const client = new MongoClient("mongodb+srv://user:pass@taskapp.rqiaa.mongodb.net/?retryWrites=true&w=majority&appName=taskapp");
let cachedClient: MongoClient | null = null;
let cachedDb: object | null = null ;

export async function connectToDatabase() {
  if (cachedClient && cachedDb  ) {
    // If there's already a cached connection, return it
    console.log(" already cahced ")
    return { client: cachedClient, db: cachedDb };
  }
  
await client.connect();
const db =   cachedDb // specify your DB name here
cachedClient = client;
cachedDb=  client.db("taskapp"); ;
return { client, db };
  // Otherwise, connect to the MongoDB client
  
}
