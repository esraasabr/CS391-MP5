import HomeContent from "@/components/HomeContent";

export default function Home() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    URL Shortener
                </h1>
                <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
                    Turn long, messy URLs into short custom links you can share anywhere
                    without clutter.
                </p>
            </section>

            <HomeContent />
        </div>
    );
}