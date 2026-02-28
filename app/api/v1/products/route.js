import { NextResponse } from "next/server"
import dbConnect, { collectionlist } from "../../../lip/dbConnect"

export const GET = async (req) => {
    try {
        const collection = dbConnect(collectionlist.productsCollection);
        const data = await collection.find({}).toArray();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}