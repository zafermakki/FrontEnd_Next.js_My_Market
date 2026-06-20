
export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
        Trusted marketplace platform
      </span>

      <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Connect buyers and sellers with a simple experience.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        A modern platform designed to simplify communication between users and
        provide a professional marketplace experience.
      </p>


      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-3xl font-bold text-slate-900">1000+</p>
          <p className="mt-2 text-sm text-slate-500">Active Users</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-3xl font-bold text-slate-900">100+</p>
          <p className="mt-2 text-sm text-slate-500">Trusted Sellers</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-3xl font-bold text-slate-900">24/7</p>
          <p className="mt-2 text-sm text-slate-500">Customer Support</p>
        </div>
      </div>
    </section>
  );
}
