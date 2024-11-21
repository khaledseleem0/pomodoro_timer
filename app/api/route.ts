import { connectToDatabase } from '../lib/db'; 
// import { MongoClient } from 'mongodb';
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;

//   try {
//     const { db } = await connectToDatabase();

//     if (method === 'GET') {
//       const posts = await db.collection('posts').find({}).toArray();
//       res.status(200).json(posts);
//     } else if (method === 'POST') {
//       const { title, content } = req.body;

//       const newPost = await db.collection('posts').insertOne({
//         title,
//         content,
//         createdAt: new Date(),
//       });

//       res.status(201).json(newPost.ops[0]);
//     } else {
//       res.status(405).end(); // Method Not Allowed
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to connect to the database or handle request' });
//   }
// }

import { NextResponse } from 'next/server'
export async function GET() {
   try {
    const { client} = await connectToDatabase();
    const all_tasks = await client.db("taski").collection("tasks").find({}).toArray();

    // console.log(all_tasks)
    return NextResponse.json({msg:"response Recieved",all_tasks},{status:200})
   } catch (error) {
      console.log(error)
    return NextResponse.json({msg:"Internal Error"},{status:501})
   }
}
