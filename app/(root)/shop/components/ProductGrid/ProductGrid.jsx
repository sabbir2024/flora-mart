import Card from "../../../../components/Card";

const products = [
    {
        name: "Aurelius Lounge Chair",
        price: 1240,
        rating: 4,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG2QFMaS_S8Do_iDeX6NZrCxm7aVWX6MlS9Pf3CPnEvQoWTdp0sOf3LB9mVhOO5D_SiBSjGSCfZ08O1Z2BIVmCQRzaN8mf1l7Jy8HQhnJWWzPcfF73W-0o2aCSfI20JLI5x6equDmbZWHTIFZ4_GczD5cQdUCIh5aRWevaJjiV8R9z2WD_7ASqyybGc_XUFL5zCUvpvycRJzy6r3K9Ij6W2qgg4vOsS--k6mo0t3dKMJ188AiNCCwYVthOfs2IXiHdNWn5ju-uXA"
    },
    {
        name: "Nordic Oak Dining",
        price: 450,
        rating: 5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTP1IaF67FHMXPVotNO-VhEb6-Ldsv1q6e-0llO5qczEOTd0nOabKh8aCfpsd1Ou6z94bSJP3Q-txlXCdi0yfxkTZ5vxbyPUetwvsadMkNnXuP7lsdU4xQ5YZG9GbsmADt0W6Oq1zSZ1opHh5NuEm0IFaxI2lTSwccUUO5vU94cwCqAlc39VLL3EUUKYYivQq5BdKrS9l0yuCbpWktXpHJBiWokRP0NlEXQfTVsSJwJ2A6dJCUszSMzoJc5qA5p_7-ObtG-XgDpg"
    }
];

export default function ProductGrid() {
    return (
        <section className="grow">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((p, i) => (
                    <Card key={i} product={p} />
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="px-10 py-5 bg-black text-white rounded-full">
                    Discover More Pieces
                </button>
            </div>
        </section>
    );
}