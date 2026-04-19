// app/api/v1/orders/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionlist } from "../../../lip/dbConnect";
import { ObjectId } from "mongodb";

// ========== GET all orders (with pagination, filter, search) ==========
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;
        const status = searchParams.get("status"); // 'pending', 'shipped', etc.
        const search = searchParams.get("search");  // search term
        const id = searchParams.get("id");          // single order by ID

        const collection = await dbConnect(collectionlist.bookingsCollection);

        // If an ID is provided, return a single order
        if (id) {
            if (!ObjectId.isValid(id)) {
                return NextResponse.json({ success: false, error: "Invalid order ID" }, { status: 400 });
            }
            const order = await collection.findOne({ _id: new ObjectId(id) });
            if (!order) {
                return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
            }
            const formatted = formatOrder(order);
            return NextResponse.json({ success: true, data: formatted });
        }

        // Build filter
        let filter = {};
        if (status && status !== "all") {
            filter.order_status = status;
        }
        if (search) {
            filter.$or = [
                { customer_name: { $regex: search, $options: "i" } },
                { customer_email: { $regex: search, $options: "i" } },
                { productName: { $regex: search, $options: "i" } }
            ];
        }

        // Get total count for pagination
        const total = await collection.countDocuments(filter);

        // Fetch paginated orders
        const orders = await collection
            .find(filter)
            .sort({ order_date: -1 }) // newest first
            .skip(skip)
            .limit(limit)
            .toArray();

        // Format each order for the frontend
        const formattedOrders = orders.map(formatOrder);

        return NextResponse.json({
            success: true,
            data: formattedOrders,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("GET /api/orders error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// ========== PATCH update order status ==========
export const PATCH = async (req) => {
    try {
        const body = await req.json();
        const { orderId, order_status } = body;

        if (!orderId || !order_status) {
            return NextResponse.json(
                { success: false, error: "orderId and order_status are required" },
                { status: 400 }
            );
        }

        if (!ObjectId.isValid(orderId)) {
            return NextResponse.json({ success: false, error: "Invalid order ID" }, { status: 400 });
        }

        const collection = await dbConnect(collectionlist.bookingsCollection);
        const result = await collection.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { order_status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.error("PATCH /api/orders error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// ========== Helper: format MongoDB order to frontend structure ==========
function formatOrder(order) {
    return {
        id: order._id.toString(),
        customer: order.customer_name,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        customerAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer_name)}&background=6366f1&color=fff`,
        date: new Date(order.order_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }),
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
        area: order.area,
        orderDate: order.order_date,
        createdAt: order.createdAt
    };
}