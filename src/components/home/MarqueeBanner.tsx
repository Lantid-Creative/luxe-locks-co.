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
    <div className="bg-primary py-4 overflow-hidden select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center mx-6 text-primary-foreground/90 text-sm font-medium tracking-widest uppercase">
            {item}
            <span className="ml-6 text-gold text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
