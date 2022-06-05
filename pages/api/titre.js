// pages/api/titre.js

import clientPromise from "../../lib/mongodb";
/**
* @swagger
* /api/titre:
*   get:
*       description: Permet de faire une recherche par titre
*       responses:
*           200:
*               description: Voici les films pour le titre recherché
*       parameters:
*         - in: query
*           name: titre
*           required: true
*           type: string
*           description: titre du film recherché
*/
export default async function handler(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");
const { titre } = req.query;
const movies = await db.collection("movies").find({title: titre}).limit(10).toArray();
res.json({ status: 200, data: movies });
}
















