import { NextResponse } from "next/server";
import getCollection, { ENTRIES_COLLECTION } from "@/db";
import type { CreateLinkRequest, ShortLink } from "@/types";

function isValidUrl(input: string): boolean {
    try {
        const parsed = new URL(input);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as CreateLinkRequest;
        let { url, alias } = body;

        if (!url || !alias) {
            return NextResponse.json(
                { error: "Both URL and alias are required." },
                { status: 400 },
            );
        }

        url = url.trim();
        alias = alias.trim();

        if (!isValidUrl(url)) {
            return NextResponse.json(
                { error: "Invalid URL. Please include http:// or https://." },
                { status: 400 },
            );
        }

        if (!/^[a-zA-Z0-9_-]{2,32}$/.test(alias)) {
            return NextResponse.json(
                {
                    error:
                        "Alias must be 2–32 characters using letters, numbers, dashes, or underscores.",
                },
                { status: 400 },
            );
        }

        const collection = await getCollection(ENTRIES_COLLECTION);

        const existing = await collection.findOne<ShortLink>({ alias });
        if (existing) {
            return NextResponse.json(
                { error: "That alias is already in use. Try another one." },
                { status: 409 },
            );
        }

        const now = new Date();
        const doc: ShortLink = {
            alias,
            url,
            createdAt: now,
            time: now.toISOString(),
        };

        await collection.insertOne(doc);

        return NextResponse.json(
            {
                alias: doc.alias,
                url: doc.url,
            },
            { status: 201 },
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Unexpected error. Please try again." },
            { status: 500 },
        );
    }
}
