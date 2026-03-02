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

        const db = await dbConnect(collectionlist.checkoutCollection);
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

// GET মেথড - সব অর্ডার দেখতে
export const GET = async (req) => {
    try {
        const db = await dbConnect();
        const orders = await db.collection(collectionlist.checkoutCollection)
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(
            { success: true, data: orders },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get Orders Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};

// DELETE মেথড - অর্ডার ডিলিট
export const DELETE = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Order ID required" },
                { status: 400 }
            );
        }

        const db = await dbConnect();
        const result = await db.collection(collectionlist.checkoutCollection)
            .deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json(
            { success: true, message: "Order deleted", data: result },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete Order Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};