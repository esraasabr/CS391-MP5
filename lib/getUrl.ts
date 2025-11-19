import getCollection, { ENTRIES_COLLECTION } from "@/db";

export default async function getUrl(alias: string): Promise<string | null> {
    if (!alias) {
        return null;
    }

    const entriesCollection = await getCollection(ENTRIES_COLLECTION);
    const doc = await entriesCollection.findOne({alias});

    if (!doc) {
        return null;
    }

    return doc.url;
}