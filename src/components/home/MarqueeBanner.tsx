const items = [
  'HAIR EXTENSIONS',
  'HAIR WIGS',
  'HAIR CARE',
  'LACE FRONTS',
  'CLOSURES',
  'BUNDLES',
  'HUMAN HAIR',
  'BODY WAVE',
];

export function MarqueeBanner() {
  const repeated = [...items, ...items];

  return (
    <div className="bg-primary py-4 overflow-hidden select-none border-y border-primary">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center mx-8 text-primary-foreground/80 text-xs font-bold tracking-[0.25em] uppercase">
            {item}
            <span className="ml-8 text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
