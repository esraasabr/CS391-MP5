"use client";

import insertUrl from "@/lib/insertUrl";
import { useEffect, useState } from "react";

export default function HomeContent() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [domain, setDomain] = useState("");
    const [hasCopied, setHasCopied] = useState(false);

    async function handleSubmitUrl(){
        setLoading(true);
        setError("");
        setHasCopied(false);

        try {
            const result = await insertUrl({url: originalUrl, alias: alias});
            if (result.length > 0) {
                setError(result);
            } else {
                setShortUrl(`${domain}/${alias}`);
            }
        } catch (e) {
            console.error(e);
            setError("Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    function handleCopy() {
        if(!shortUrl) return;
        navigator.clipboard.writeText(shortUrl);
        setHasCopied(true);
    }

    useEffect(() => {
        setDomain(window.location.origin);
    }, []);

    return (
        <section>
            <div className="form-card">
            <div className="rounded-2xl bg-white shadow-md border border-emerald-100 px-6 py-6">
                <header className="mb-6 space-y-1">
                    <h2 className="text-xl md:text-xl font-semibold">
                        Create a short link
                    </h2>
                    <p className="text-sm text-slate-500">
                        Paste a long URL and choose a custom ending to make it easy to
                        remember.
                    </p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitUrl();
                    }}
                    className="space-y-4"
                >
                    {/* URL field */}
                    <div className="space-y-1">
                        <label htmlFor="url" className="text-sm font-medium">
                            Destination URL
                        </label>
                        <input
                            id="url"
                            name="url"
                            type="url"
                            placeholder="https://example.com/very/long/path"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            required
                            disabled={loading}
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                        />
                    </div>

                    {/* Alias field */}
                    <div className="space-y-1">
                        <label htmlFor="alias" className="text-sm font-medium">
                            Custom alias
                        </label>
                        <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {domain}/
              </span>
                            <input
                                id="alias"
                                name="alias"
                                placeholder="my-link"
                                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                required
                                disabled={loading}
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-slate-500">
                            Use letters, numbers, dashes, or underscores.
                        </p>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-400 disabled:opacity-70 transition-colors"
                    >
                        {loading ? "Shortening…" : "Shorten"}
                    </button>

                    {/* Error message */}
                    {error && (
                        <div className="mt-2 text-sm font-medium text-red-600 text-center">
                            {error}
                        </div>
                    )}
                </form>

                {/* Result box */}
                {shortUrl && (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="text-xs font-medium text-slate-500 mb-1">
                            Your shortened URL:
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-emerald-700 hover:text-emerald-600 hover:underline break-all"
                            >
                                {shortUrl}
                            </a>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="sm:ml-auto inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                {hasCopied ? "Copied ✓" : "Copy"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </section>
    );
}