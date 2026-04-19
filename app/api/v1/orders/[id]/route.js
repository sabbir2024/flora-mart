import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../../lip/dbConnect";

export const PATCH = async (req, { params }) => {
    try {
        const { id } = await params; // URL থেকে id নিন
        const body = await req.json();
        const { order_status } = body;

        console.log("PATCH request:", { id, order_status }); // Debug log

        if (!order_status) {
            return NextResponse.json(
                { success: false, error: "order_status is required" },
                { status: 400 }
            );
        }

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid order ID format" },
                { status: 400 }
            );
        }

        // Connect to database
        const collection = await dbConnect(collectionlist.bookingsCollection);

        // Update the order
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    order_status: order_status,
                    updatedAt: new Date()
                }
            }
        );

        console.log("Update result:", result);

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Order status updated successfully",
            data: { orderId: id, order_status }
        });

    } catch (error) {
        console.error("PATCH /api/orders/[id] error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// GET single order (optional)
export const GET = async (req, { params }) => {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid order ID" },
                { status: 400 }
            );
        }

        const collection = await dbConnect(collectionlist.bookingsCollection);
        const order = await collection.findOne({ _id: new ObjectId(id) });

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        const formattedOrder = {
            id: order._id.toString(),
            customer: order.customer_name,
            customerEmail: order.customer_email,
            customerPhone: order.customer_phone,
            status: order.order_status,
            total: order.total_price,
            productName: order.productName,
            quantity: order.quantity,
            basePrice: order.basePrice,
            deliveryCharge: order.delivery_charge,
            paymentMethod: order.payment_method,
            deliveryAddress: order.delivery_address,
            division: order.division,
            district: order.district,
            orderDate: order.order_date
        };

        return NextResponse.json({ success: true, data: formattedOrder });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};