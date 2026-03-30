export default function AboutHero() {
    return (
        <section className="max-w-screen-2xl font-bold mx-auto px-4 md:px-6  grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 relative">
                <div className="rounded-xl overflow-hidden aspect-4/5 md:aspect-16/10">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpNktkhUHbzer8QFNsru1WXpeyQujJ3uAsAhrNCphtgfFSicN_LMa-pW1V2XbUI2AND_8TJM6x_JPWw6Whr0ScbuUZV27-6SWDbl8WrUiE1FUf2JWJYqge8cicvzo5KQvr1ZjvQumI-BGocUiZqbn11NZzy7_B90YYr45Rx4XZmgyOF3D24oR_kyjZnO9qRKEf1eBwZC-BmQoHiAWAGB5CiRdfIIddFp0d_xb6lvL5usAAZkUN0exsh-3R8jcmKBlmoanehWi5Zw"
                        className="w-full h-full object-cover"
                        alt="Minimal interior"
                    />
                </div>

                <div className="absolute -bottom-10 -right-6 hidden md:block w-64 h-80 rounded-xl overflow-hidden shadow-2xl border-8 border-white rotate-3">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAorNODhnnsSlYgkSE_xx0TdGonFeU7SBoPM4Q_lnRm93MAUxqf_J3qtqI5ghiV4cdf2x0EswKYcbdHLWnAdO_RXwEZoJ9YVOVyhUfmTpg0hjf44Cm-MCjuMOwtN6xh-3yQwGxp5qc5K8LXXqjDsusYttKyd8DEoj13f2HAz-RYr_l4sxp3D6mpjTulIuB0dtWGWM68J9lOc-vpQCLeKeY86keXrBIApjbbeRIyRz9GG5lzmFuRZfrE8q3KeoKiHIt6YNHPM0oaow"
                        className="w-full h-full object-cover"
                        alt="Detail"
                    />
                </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="text-orange-600 text-xs font-bold uppercase">
                    Our Philosophy
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Curated <br /> Simplicity.
                </h1>

                <p className="text-gray-500">
                    We believe objects should reflect your taste and lifestyle.
                </p>

                <a
                    href="#login"
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl w-fit"
                >
                    Join the Collective
                </a>
            </div>

        </section>
    );
}