'use server';

import dbConnect, { collectionlist } from "../../lip/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
    const { email, password, name } = payload;

    //check if email and password are provided
    if (!email || !password) return null;

    //connect to database
    const userCollection = await dbConnect(collectionlist.userCollection);

    // check if user exists in database
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) return null;

    //create new user in database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        provider: "credentials",
        name,
        email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    //create new user in database
    if (!existingUser) {
        const result = await userCollection.insertOne(newUser);
        if (result.insertedId) {
            return { email, role: "user", name, _id: result.insertedId.toString() };
        }
    }
    return null;
}

export const logIntUser = async (payload) => {
    const { email, password } = payload;

    //check if email and password are provided
    if (!email || !password) return null;

    //connect to database
    const userCollection = await dbConnect(collectionlist.userCollection);

    // check if user e in database
    const user = await userCollection.findOne({ email });
    if (!user) return null;

    //password comparing
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    if (isPasswordValid) {
        return user
    } else {
        return null
    }
}