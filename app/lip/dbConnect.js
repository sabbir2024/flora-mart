import { MongoClient, ServerApiVersion } from 'mongodb';


export const collectionlist = {
    productsCollection: "products",
    sliderCollection: "banner",
    userCollection: "users"
};


const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export default function dbConnect(collectionName) {
    return client.db("floraDB").collection(collectionName)
}
