import { ObjectId } from "mongodb";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";
import Checkout from "./components/Checkout";

export default async function page({ params }) {
    const paramsId = await params;
    const id = paramsId?.id
    const product = await dbConnect(collectionlist.productsCollection).findOne({ _id: new ObjectId(id) })

    return (
        <div>
            <Checkout product={product} />
        </div>
    );
}