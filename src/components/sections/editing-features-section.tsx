import Image from 'next/image';

const EditingFeaturesSection = () => {
  return (
    <section className="bg-black text-white py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col space-y-8 text-left">
            <h2 className="text-5xl font-semibold leading-tight tracking-tight">
              Edit Faster, Create More
            </h2>
            <div className="space-y-4 text-xl">
              <p>
                Transform Your Editing Process with Premiere Pro &amp; After Effects Presets for Any Content!
              </p>
              <div>
                <p className="font-bold">
                  Level up your editing, stand out from the crowd and MAKE MORE $$
                </p>
                <p>
                  Save time &amp; Improve your editing!
                </p>
              </div>
            </div>
            <div>
              <a
                href="https://theeffectsguy.store/products/ultimate-creator-toolkit"
                className="inline-block rounded-full border border-white bg-transparent px-8 py-3 text-base font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-black"
              >
                Let&apos;s go
              </a>
            </div>
          </div>
          <div className="w-full">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b844646f-2e66-43d4-a49f-75c25755ec0b-theeffectsguy-store/assets/images/effects_guy_short_4_1-11.gif?"
              alt="An animation showing video editing software effects being applied with a drag-and-drop interface."
              width={1500}
              height={750}
              className="h-auto w-full rounded-xl"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditingFeaturesSection;