import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest)
{
    const directoryPath = path.join(process.cwd(), "data/categories");
    const files = fs.readdirSync(directoryPath);

    const categories = files
        .filter(f => f.endsWith("-questions.json"))
        .map(f => f.replace("-questions.json", "").replace("-", ""));

    return NextResponse.json({ categories });
}