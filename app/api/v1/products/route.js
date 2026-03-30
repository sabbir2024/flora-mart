import { NextResponse } from "next/server"
import dbConnect, { collectionlist } from "../../../lip/dbConnect"

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const isNew = searchParams.get('isNew');

        let query = {}

        if (isNew === 'true') {
            query.isNew = true;
        }

        const collection = dbConnect(collectionlist.productsCollection);
        const data = await collection.find(query).toArray();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}