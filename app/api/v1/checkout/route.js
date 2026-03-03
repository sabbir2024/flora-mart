import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";
import { ObjectId } from "mongodb";

// POST মেথড - অর্ডার তৈরি
export const POST = async (req) => {
    try {
        const data = await req.json();

        // ভ্যালিডেশন
        if (!data.customer_name || !data.customer_phone || !data.delivery_address) {
            return NextResponse.json(
                { success: false, message: "দয়া করে প্রয়োজনীয় তথ্য দিন" },
                { status: 400 }
            );
        }

        const db = await dbConnect(collectionlist.bookingsCollection);
        const result = await db.insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(
            {
                success: true,
                message: "অর্ডার সফলভাবে সম্পন্ন হয়েছে",
                order_id: result.insertedId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Checkout API Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};
