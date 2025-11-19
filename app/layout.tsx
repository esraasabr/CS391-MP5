import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/Header";
import { Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
    title: "CS391 URL Shortener",
    description: "Create clean, shareable short links in seconds.",
};

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${robotoMono.className} antialiased bg-gradient-to-b from-emerald-50 to-emerald-100 text-slate-900`}
        >
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-4xl">{children}</div>
            </main>
        </div>
        </body>
        </html>
    );
}
