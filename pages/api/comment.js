// pages/api/movies.js
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

//pages/api/comment.js
/**
* @swagger
* /api/comments:
*   post:
*       description: ajoute un commentaire a un film (tout les parametre doivent étre entré sinon retourne error 403). La date et automatiquement générer via le javascript
*       responses:
*           200:
*               description: Un commentaire a était ajouté
*       parameters:
*         - in: query
*           name: id
*           required: true
*           type: string
*           description: id du commentaire
*         - in: query
*           name: name
*           required: true
*           type: string
*           description: Nom de l'utilisateur
*         - in: query
*           name: email
*           required: true
*           type: string
*           description: email de l'utilisateur
*         - in: query
*           name: idmovie
*           required: true
*           type: string
*           description: Id du film que l'on commente
*         - in: query
*           name: text
*           required: true
*           type: text
*           description: Commentaire
*/




export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    console.log("id: ", req.body);


    if( req.body.id && req.body.name && req.body.email && req.body.idmovie && req.body.text || req.body.id != "" && req.body.name != "" && req.body.email != "" && req.body.idmovie != "" && req.body.text != ""){
        const id = ObjectId(req.body.id)
        const idmovie = ObjectId(req.body.idmovie)
        const date = new Date()
        const comment = await db.collection("comments").insertOne({"_id": id,"name":req.body.name,"email":req.body.email,"movie_id": idmovie,"text":req.body.text,"date": date});
        res.json({ status: 200, data: "Success" });
    }
    else{
        res.json({ status: 403, data: "error a params is empty" });
    }
    
}