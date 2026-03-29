import Card from "../../../components/Card";

export default function ProductGrid() {
    const products = [
        {
            name: "Watch", price: 320, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9WAR5UuUac_TXH_P56cP2zGxcQGMqQYGRCYQu6GK15zWeRRJRMjYEnTq_EAJ0yzU5NHMs9yBNxuImQUF-r8xXBlTYq2M6OZQd8uRz0RVhm0yUisUe3yHL9wjG9UlN5k-K0heulvFQaL1FPbxh0M5Nc4LrBdokQAFfM2gHtCCpsL2h1EYx8HRfCFyg2XMycOTY18qjF_ax1hZQPq7z9K-a91Oh6tltjmtnKz5rW7QC7JIZCyZcJ5k-Z3s0pbjNKRybS-8fn7rP6Q",
            rating: 3
        },
        {
            name: "Headphone", price: 580, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASBPBZD3vP1mrtyeUJ-UCmsz_ubW28Dzc8xlcTcT4XxHsbahkWzQGxSzBkvk_ww8W1GKu-W03Cp709B5rS6Mhb4Q7MGlZsm2SUGny5Xtmo82bjrib911iUOiD52LC20CWXfY9KLFMPIPhXTl8uKBoIUEUCffVhF1LgsZ3ZrtkDxMoQzjSPOKy6dVYe9jW9pNJafLyFzyzWjyyC7s7XskkDBxya5pynBwumhR-SNZm4cKVUETUF2rgmfbQt2Byi0oAD7sXp4L_nmQ",
            rating: 5
        },
        {
            name: "Shoes", price: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf1dn6jHkKXjN1VxuYXcPVM7hd2vBXeSrEUGgAZ9niSTz-m7bEWiR2HWURx3s1rH37C7wn6SJChLPhS4jXtmiXjUuk3hQlhD4F69B5GFMRx8dutXZF9fl10OIvCLr1HBzkNXGic444UMgSbbxbRXXKab9UzotTfBqgm2NaZG9bFe_LMN84wWEOXqEZptF64bYHOaq2Scu4LfYOD_SSh51vpx7BMKXaGzip6-A9OQQ9ASIrYgY6RMvhYlqb1pFjPHutGzl4Cg5Mdw",
            rating: 4
        },
        {
            name: "Camera", price: 120, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXisbpIBq-ceiVqh3aRd1ngjp-uNxWTJ5725WgVbXZKfe7PKc2xkjSFRyoA9MklGQgo7ChHo9g_T85f54zkIHpkbH2OY3GC5Jd6sM_luS4X4cQ3VfQ_0OnShOqTnT2mrF71QSm_iDqY4UNnx8RfvDIpUXR8Ihtm6NGmKI-21RD4E2kO5oZ0Ufq5gxAOf-uxLdvP0VFDCcLNomTQKiujH2hb6S9E9Bp4mhBtb2RN96QLgJQ_yvVoM5Ug7sqoBet3okYaL7xShmRjw",
            rating: 5
        },
    ];

    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
                Collection
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                    <Card key={i} product={p} />
                ))}
            </div>
        </section>
    );
}