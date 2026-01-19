import { Instagram } from 'lucide-react';
import { instagramPosts } from '@/lib/data';

export function InstagramSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold mb-3">
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">@LuxeHair</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-muted-foreground">
            Share your LuxeHair moments with #LuxeHairBeauty
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden image-zoom"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
