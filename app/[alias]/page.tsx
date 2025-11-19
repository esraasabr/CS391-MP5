
import getCollection, { ENTRIES_COLLECTION } from "@/db";
import type { ShortLink } from "@/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type AliasPageProps = {
    params: {
        alias: string;
    };
};

export default async function AliasRedirectPage( props : AliasPageProps) {
    const { alias } = await props.params;

    const collection = await getCollection(ENTRIES_COLLECTION);
    const entry = await collection.findOne<ShortLink>({ alias });

    if (!entry) {
        // If alias not found, send them home (or to a custom 404 page)
        redirect("/");
    }

    redirect(entry.url);
}

