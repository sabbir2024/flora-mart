export default function BentoSection() {
    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-2 bg-black text-white rounded-xl bg-fixed p-6"
                    style={{
                        backgroundImage:
                            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                    }}>
                    <h3 className="text-2xl font-bold mb-3">Trending</h3>
                    <p>Best product right now</p>
                </div>

                <div className="bg-orange-600 text-white rounded-xl p-6">
                    <h3 className="text-xl font-bold">Deals</h3>
                </div>

            </div>
        </section>
    );
}