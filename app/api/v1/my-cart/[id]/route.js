import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionlist } from "../../../../lip/dbConnect";

export const PUT = async (req, { params }) => {
    try {
        // params থেকে id নিন (ডাইনামিক রুট থেকে)
        const { id } = await params;

        // request body থেকে ডাটা নিন
        const body = await req.json();

        console.log('Order ID from params:', id);
        console.log('Update data:', body);

        // ডাটাবেজ আপডেট করুন
        const db = await dbConnect(collectionlist.bookingsCollection)

        const result = await db.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    order_status: body.order_status,
                    updatedAt: new Date()
                }
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Order updated successfully",
                data: result
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};

// GET মেথড (অপশনাল)
export const GET = async (req, { params }) => {
    try {
        const { id } = await params;

        const db = await dbConnect(collectionlist.bookingsCollection);
        const order = await db.findOne({ _id: new ObjectId(id) });

        return NextResponse.json(
            { success: true, data: order },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};