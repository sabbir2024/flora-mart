export default function Filters() {
    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-10">
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between">

                <div className="tabs tabs-box bg-white p-1 rounded-xl">

                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all checked:bg-orange-600 checked:text-white"
                        aria-label="All"
                        defaultChecked
                    />

                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all checked:bg-orange-600 checked:text-white"
                        aria-label="Home"
                    />

                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all checked:bg-orange-600 checked:text-white"
                        aria-label="Tech"
                    />

                </div>

                <select className="bg-transparent border-none focus:outline-none">
                    <option>Latest</option>
                    <option>Popular</option>
                </select>

            </div>
        </section>
    );
}