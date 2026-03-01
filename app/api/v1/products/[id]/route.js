import { NextResponse } from "next/server"
import dbConnect, { collectionlist } from "../../../../lip/dbConnect"
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    try {
        const requestedId = await params;
        const productCollecetion = await dbConnect(collectionlist.productsCollection)
        const result = await productCollecetion.findOne({ _id: new ObjectId(requestedId) })

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}