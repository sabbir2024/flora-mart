import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";

export const POST = async (req) => {

    try {
        const body = await req.json();
        const userCollection = await dbConnect(collectionlist.userCollection);
        const existingUser = await userCollection.findOne({ email: body.email })
        if (!existingUser) {
            const result = await userCollection.insertOne({
                ...body,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return NextResponse.json(
                {
                    success: true,
                    message: "User created successfully",
                    data: {
                        id: result.insertedId,
                        email: body.email,
                        name: body.name
                    }
                }, { status: 201 })
        }
        return NextResponse.json({ success: false, message: 'User already exists with this email' }, { status: 500 })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}