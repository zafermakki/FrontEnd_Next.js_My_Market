import Link from "next/link";


export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] bg-slate-900 px-8 py-14 text-white shadow-xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-3xl font-bold">
              Ready to join our platform?
            </h3>

            <p className="mt-4 text-slate-300">
              Start today and experience a modern marketplace built for
              simplicity and growth.
            </p>
          </div>

          <div className="flex justify-end">
           <Link
            href="/createaccount"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-slate-300"
          >
            Get Started
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}