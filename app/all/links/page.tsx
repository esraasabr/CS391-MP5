import getCollection, { ENTRIES_COLLECTION} from "@/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LinksIndex(){
    console.log("fetching all shortened links");
    const collection = await getCollection(ENTRIES_COLLECTION);
    const links = await collection.find({}).toArray();

    return (
        <main className="px-4 py-8 md:px-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Saved Short Links
                </h1>
                <Link
                    href="/"
                    className="text-sm md:text-base underline underline-offset-4 text-emerald-600 hover:text-emerald-500"
                    >
                    Create new
                </Link>
            </div>

            {links.length === 0 ? (
                <p className="text-slate-500"> No links yet - go make your first one!</p>
            ) : (
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((entry, index) => (
                        <article
                        key={entry.alias + index}
                        className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm px-4 py-3 flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    #{index+1}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {entry.time ?? "created at unknown time"}
                                </span>
                            </div>

                            <h2 className="text-sm font-semibold text-slate-900 mt-1">
                                {entry.alias || "(no alias)"}
                            </h2>

                            <Link
                                href={entry.url}
                                target="_blank"
                                className="mt-1 text-xs break-all text-emerald-700 hover:text-emerald-500 hover:underline"
                                >
                                {entry.url}
                            </Link>
                        </article>
                    ))}
                </section>
            )}
            </main>

    );
}