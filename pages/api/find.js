// pages/api/genre.js
import clientPromise from "../../lib/mongodb";

/**
* @swagger
* /api/find:
*   get:
*       description: Returns année
*       responses:
*           200:
*               description: année
*       parameters:
*         - in: query
*           name: genres
*           type: string
*           description: genres du film recherché
*         - in: query
*           name: annee
*           type: string
*           description: année du film recherché
*         - in: query
*           name: titre
*           type: string
*           description: titre du film recherché
*/
export default async function handler(req, res) {


    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const query = req.query
    const annee = query.params("annee");
    const movies = await db.collection("movies").find({year: parseInt(annee)}).limit(10).toArray();
    res.json({ status: 200, data: movies });
    }