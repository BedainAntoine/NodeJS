// pages/api/year.js
import clientPromise from "../../lib/mongodb";
/**
* @swagger
* /api/year:
*   get:
*       description: Permet de faire une recherche avec l'année du film
*       responses:
*           200:
*               description: Voici les films pour l'année recherché
*       parameters:
*         - in: query
*           name: annee
*           required: true
*           type: string
*           description: année du film recherché
*/
export default async function handler(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");
const { annee } = req.query;
const movies = await db.collection("movies").find({year: parseInt(annee)}).limit(10).toArray();
res.json({ status: 200, data: movies });
}