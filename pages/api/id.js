// pages/api/year.js
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
/**
* @swagger
* /api/id:
*   get:
*       description: Returns id
*       responses:
*           200:
*               description: id
*/
export default async function handler(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");
const { id } = req.query ;
const movies = await db.collection("movies").find({_id: ObjectId (id)}).limit(10).toArray();
res.json({ status: 200, data: movies });

}