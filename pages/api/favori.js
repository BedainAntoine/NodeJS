import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

//pages/api/favori.js
/**
* @swagger
* /api/favori:
*   post:
*       description: Créer la table favori si elle n'existe pas et permet de lier un id utilisateur a l'id d'un film pour créer un favori
*       responses:
*           200:
*               description: Un favori a était créé
*       parameters:
*         - in: query
*           name: ii movie
*           required: true
*           type: string
*           description: id du film favori
*         - in: query
*           name: id user
*           required: true
*           type: string
*           description: Id de l'utilisateur
*/

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if(req.body.idmovie && req.body.iduser || req.body.idmovie != "" && req.body.iduser != "" ){
        const idmovie = ObjectId(req.body.idmovie);
        const iduser = ObjectId(req.body.iduser);
        const newFavori = await db.collection("favori").insertOne({"movie_id": idmovie,"user_id": iduser });
        res.json({ status: 200, data: "c" });
    }
    else{
        res.json({ status: 403, data: "error a params is empty" });
    }
}