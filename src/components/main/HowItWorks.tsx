
const steps = [
  {
    title: "Browse Listings",
    description:
      "Explore available listings from trusted users with a modern experience.",
  },
  {
    title: "Contact Seller",
    description:
      "Communicate directly with the seller to get all required information.",
  },
  {
    title: "Complete Agreement",
    description:
      "Finalize the process quickly and securely with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h3 className="text-3xl font-bold tracking-tight">
            How It Works
          </h3>

          <p className="mt-2 text-slate-600">
            A simple process for connecting buyers and sellers.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.5rem] bg-slate-50 p-6 ring-1 ring-slate-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                {index + 1}
              </div>

              <h4 className="mt-5 text-xl font-semibold">
                {step.title}
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}