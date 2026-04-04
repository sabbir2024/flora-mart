// app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const category = searchParams.get('category');
        const sort = searchParams.get('sort');

        // Query বিল্ড
        let query = {};
        if (category && category !== 'All' && category !== 'Home') {
            query.category = category;
        }

        // Sort configuration
        let sortConfig = {};
        if (sort === 'Latest') {
            sortConfig = { createdAt: -1 };
        } else if (sort === 'Popular') {
            sortConfig = { popularity: -1 };
        } else {
            sortConfig = { createdAt: -1 };
        }

        const collection = await dbConnect(collectionlist.productsCollection);
        const data = await collection.find(query).sort(sortConfig).toArray();

        return NextResponse.json({
            success: true,
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
};