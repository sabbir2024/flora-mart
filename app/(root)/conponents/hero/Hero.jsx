import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-16 md:mb-24 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                <div className="lg:col-span-5 space-y-6">
                    <span className="text-orange-600 text-xs font-bold uppercase">
                        The Seasonal Edit
                    </span>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight">
                        Curated <br /> Objects for <br /> <span className="text-orange-600">Modern</span> Living.
                    </h1>

                    <p className="text-gray-500 font-bold">
                        A strictly filtered selection of high-quality essentials.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href={'/shop'} className="bg-orange-600 font-bold text-white px-6 py-3 rounded-xl">
                            Explore
                        </Link>
                        <button className="bg-gray-200 font-bold text-black px-6 py-3 rounded-xl">
                            Philosophy
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <img className="rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVhEZr7-xrw0RCbsr6sICzlp773rTWtxzwIBVSkNpr3jT2HPp3ES_7j-Wjr4Wegs7UtUoC6ApbisGInPijWvkP3BxNohjM4WYvTLlDgngVo8GTwu8KFnlfuIgfe-yBxFm5cJwrWxV5ickNEbCYLP7EMh1a9WlWzrMSII-UBR4kP0MOeK-Tf8puKHKKmDZKz4Cwuh4dTt2XD6CAXbVj-Ds02TiCdjpJPXUTALrCMNshzOeOIW342pfVgk-1MT7ZZkhmb-7nT9jFWQ" />
                    <img className="rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeWhkdBO5UrZc2qtqY5QfvohhqqH4q3-rWC_wWi_eoJHIRgMS_7EZQTpOPhGxqAoOQjGYp-D3vaO9PRXNg_aHxK4-t4U9rc_xrwS2sDf8naqZL9rtQvo8QFL-hqtBMN9I4dK0x6x85EhfO50zZaxOKvX0DdFG1aUc0GPxxw1s3mKZP9yuuLUNF2_JQrM6_uAEOLb3YV4XN4jYhaJqNZjaCsWsjCQTUPZnCr3abPdrPqqqMSLhsokJKOf1XMKs8p8aSSSsmAKlE8A" />
                </div>

            </div>
        </section>
    );
}