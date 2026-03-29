export default function BrandStory() {
    return (
        <section className="bg-gray-100 py-20 font-bold md:py-32">
            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">

                <h2 className="text-2xl md:text-4xl font-bold mb-10">
                    The Narrative of Less
                </h2>

                <div className="space-y-6 text-gray-600 text-left">
                    <p>
                        Founded in 2024, Editorial Minimalism was born from a frustration with clutter.
                    </p>
                    <p>
                        Every product is carefully selected for quality and timeless design.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-16">

                    <div className="bg-white p-6 rounded-xl border-b-4 border-orange-600">
                        <h3 className="font-bold mb-2">Artisan Led</h3>
                        <p className="text-sm text-gray-500">
                            High quality handcrafted products.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-b-4 border-purple-500">
                        <h3 className="font-bold mb-2">Sustainable</h3>
                        <p className="text-sm text-gray-500">
                            Eco-friendly production.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-b-4 border-gray-800">
                        <h3 className="font-bold mb-2">Timeless</h3>
                        <p className="text-sm text-gray-500">
                            Designed to last.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}