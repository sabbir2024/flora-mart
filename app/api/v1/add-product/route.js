import { NextResponse } from "next/server"
import dbConnect, { collectionlist } from "../../../lip/dbConnect";

export const POST = async (req) => {

    const body = await req.json();
    if (!body.productName) return NextResponse.json({
        success: false,
        message: "product name is required",
    })

    try {
        const db = await dbConnect(collectionlist.productsCollection);

        const result = await db.insertOne(body);

        if (result.acknowledged === true) {
            return NextResponse.json({
                success: true,
                message: "Product added successfuly",
                insertedId: result.insertedId,
                productName: body.productName
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to add product. Please try again",
            })
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}