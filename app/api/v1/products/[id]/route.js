import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";
import dbConnect, { collectionlist } from "../../../../lip/dbConnect";

export const GET = async (req, { params }) => {
    try {
        const requestedId = await params;

        const query = { _id: new ObjectId(requestedId) };
        const productCollecetion = await dbConnect(collectionlist.productsCollection)
        const result = await productCollecetion.findOne(query);

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export const DELETE = async (req, { params }) => {
    try {
        const requestedId = await params;
        const query = { _id: new ObjectId(requestedId) };
        const productCollecetion = await dbConnect(collectionlist.productsCollection)
        const result = await productCollecetion.deleteOne(query);

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}