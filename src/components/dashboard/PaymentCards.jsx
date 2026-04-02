export const PaymentCards = () => {
  const cards = [
    {
      id: "primary",
      tone: "from-black/95 to-slate-900/95",
      label: "Active",
      number: "6782",
      exp: "09/29",
      cvv: "611",
      holder: "Personal Card",
    },
    {
      id: "secondary",
      tone: "from-orange-500 to-orange-600",
      label: "Active",
      number: "4356",
      exp: "08/28",
      cvv: "392",
      holder: "Business Card",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.id}
          className={`relative overflow-hidden rounded-[26px] bg-gradient-to-br ${card.tone} p-5 text-white shadow-[0_16px_42px_rgba(2,6,23,0.35)]`}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-white/10 blur-sm" />
            <div className="absolute right-16 top-6 h-10 w-10 rounded-lg bg-white/10" />
          </div>

          <div className="relative flex items-start justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
              {card.label}
            </span>
            <div className="relative h-7 w-12">
              <span className="absolute left-0 top-0 h-7 w-7 rounded-full bg-red-500/95" />
              <span className="absolute right-0 top-0 h-7 w-7 rounded-full bg-amber-300/95 mix-blend-screen" />
            </div>
          </div>

          <div className="relative mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">
              Card number
            </p>
            <p className="mt-1 text-lg font-semibold">
              **** **** {card.number}
            </p>
          </div>

          <div className="relative mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                Exp
              </p>
              <p className="font-semibold">{card.exp}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                CVV
              </p>
              <p className="font-semibold">{card.cvv}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                Type
              </p>
              <p className="font-semibold">{card.holder}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
