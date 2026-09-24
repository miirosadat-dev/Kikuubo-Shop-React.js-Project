// A wide picture banner with the page title on top, used by Contact and About.
//
// Size:      at least 40% of the screen height on phones, 50% from tablet up.
// No stretch: object-cover fills the box by cropping the edges, never by squashing.
// "position": which part of the picture to keep when it has to be cropped
//             (x y, for example "72% 8%" = far right, near the top).
const PageBanner = ({ image, title, text, position = "center" }) => (
    <section className="relative flex min-h-[40dvh] items-center overflow-hidden rounded-2xl bg-gray-300 md:min-h-[50dvh]">
        <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: position }}
        />

        {/* Darkens the picture so the white text is easy to read.
        Even on phones, then fading out to the right on wider screens. */}
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/55 md:bg-transparent md:bg-linear-to-r md:from-black/70 md:via-black/40 md:to-transparent"
        />

        <div className="relative max-w-xl p-6 md:p-12">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {title}
            </h1>
            {text && (
                <p className="mt-3 text-base leading-7 text-gray-100 md:text-lg">
                    {text}
                </p>
            )}
        </div>
    </section>
);

export default PageBanner;