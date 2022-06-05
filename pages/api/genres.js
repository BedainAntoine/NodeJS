// pages/api/genre.js
import clientPromise from "../../lib/mongodb";
/**
* @swagger
* /api/genres:
*   get:
*       description: Permet de faire une recherche par genre
*       responses:
*           200:
*               description: Voici les film pour le genre recherché
*       parameters:
*         - in: query
*           name: genre
*           required: true
*           type: string
*           description: genre du film recherché
*/

export default async function handler(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");
const { type } = req.query;
const movies = await db.collection("movies").find({genres: type}).limit(10).toArray();
res.json({ status: 200, data: movies });
}
