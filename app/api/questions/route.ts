import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
    const category = request.nextUrl.searchParams.get("category");

    if (!category) {
        return NextResponse.json({ error: "Missing category parameter" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "categories", `${category}-questions.json`);

    try {
        const fileContents = await readFile(filePath, "utf-8");
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (err) {
        console.warn("File not found...", err);
        return NextResponse.json({ error: "File not found or invalid JSON" }, { status: 404 });
    }
}
