import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch("https://mintcream-opossum-883740.hostingersite.com/api/orders-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": req.headers.get("authorization") || "", // اگه نیاز باشه
            },
            body: JSON.stringify(body),
        });

        const text = await res.text(); // متن خام بگیریم
        let data;
        try {
            data = JSON.parse(text); // اگه JSON بود
        } catch {
            data = { raw: text }; // اگه متن ساده بود
        }

        return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "خطای ناشناخته" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: "Orders API is working 🚀" });
}