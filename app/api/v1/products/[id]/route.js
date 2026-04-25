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

export const PATCH = async (req, { params }) => {
    try {
        const requestedId = await params;
        const body = await req.json();

        const query = { _id: new ObjectId(requestedId) };

        // Only update fields that are provided
        const updateFields = {};
        const allowedFields = [
            'productName', 'category', 'brand', 'description',
            'basePrice', 'comparePrice', 'sku', 'quantity',
            'isVisible', 'isPreorder', 'weight', 'tags',
            'images', 'primaryImage'
        ];

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updateFields[field] = body[field];
            }
        }

        // Add updatedAt timestamp
        updateFields.updatedAt = new Date().toISOString();

        const updateData = {
            $set: updateFields
        };

        const productCollection = await dbConnect(collectionlist.productsCollection);
        const result = await productCollection.updateOne(query, updateData);

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Fetch and return the updated product
        const updatedProduct = await productCollection.findOne(query);

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}