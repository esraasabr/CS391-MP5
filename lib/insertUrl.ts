"use server";
import getCollection, { ENTRIES_COLLECTION} from "@/db";
import getUrl from "./getUrl";
import type { CreateLinkRequest } from "@/types";

export default async function insertUrl(entry: CreateLinkRequest): Promise<string>{
    const { url, alias } = entry;

    if(!url || !alias) {
        return "URL or alias is missing";
    } else if (
        url.startsWith("https://cs391-url-shortener.vercel.app") ||
        url.startsWith("http://localhost:3000")
    ) {
        return "Invalid URL: Cycles are not allowed";
    } else if (encodeURIComponent(alias) !== alias){
        return "Invalid alias: You may only use valid URL characters";
    }

    try {
        const res = await fetch(url);
        if (res.status < 200 || res.status >= 500){
            console.log("invalid url response", res.status);
            return "Invalid URL: Bad response " + res.status;
        }
    } catch {
        console.log("failed to fetch");
        return "Invalid URL: Could not verify URL. Please try again";
    }

    const existingUrl = await getUrl(alias);
    if (existingUrl) {
        return "Invaid alias: This alias already exists";
    }

    const entriesCollection = await getCollection(ENTRIES_COLLECTION);
    const res = await entriesCollection.insertOne({
        alias,
        url,
        time: new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
                year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
    }).format(new Date()),
    });

return res.acknowledged ? "" : "Something went wrong. Please try again";
}