import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";


export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = await searchParams.get("email")
        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized User' },
                { status: 401 }
            );
        }

        const collection = await dbConnect(collectionlist.bookingsCollection)
        const orders = await collection.find({ customer_email: email }).toArray();

        return NextResponse.json(
            { success: true, data: orders },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}