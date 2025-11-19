import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full border-b border-slate-200 bg-white/90">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <Link
                    href="/"
                    className="text-2xl md:text-3xl font-semibold tracking-tight"
                >
                    CS391 URL Shortener
                </Link>
            </div>
        </header>
    );
}