import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';

const sizes = [
  { name: 'Small', circumference: '21" - 21.5"', description: 'Petite head size, snug fit' },
  { name: 'Medium', circumference: '22" - 22.5"', description: 'Most common size, standard fit' },
  { name: 'Large', circumference: '23" - 23.5"', description: 'Larger head size, comfortable fit' },
];

const steps = [
  { step: 1, title: 'Gather a soft tape measure', desc: 'Use a flexible fabric tape measure for accuracy.' },
  { step: 2, title: 'Measure your hairline', desc: 'Place the tape at the center of your forehead, along your natural hairline.' },
  { step: 3, title: 'Wrap around your head', desc: 'Bring the tape behind your ear, down to the nape, and back to the front.' },
  { step: 4, title: 'Note the measurement', desc: 'Where the tape meets is your head circumference. Match it to a size below.' },
];

export function CapSizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gold p-0 h-auto text-sm">
          <Ruler className="w-4 h-4 mr-1" />
          Cap Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Cap Size Guide</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Steps */}
          <div>
            <h4 className="font-medium mb-3">How to Measure</h4>
            <div className="space-y-3">
              {steps.map(s => (
                <div key={s.step} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Chart */}
          <div>
            <h4 className="font-medium mb-3">Size Chart</h4>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary/50 px-4 py-2 text-sm font-medium">
                <span>Size</span>
                <span>Circumference</span>
                <span>Fit</span>
              </div>
              {sizes.map(size => (
                <div key={size.name} className="grid grid-cols-3 px-4 py-3 text-sm border-t border-border">
                  <span className="font-medium">{size.name}</span>
                  <span className="text-muted-foreground">{size.circumference}</span>
                  <span className="text-muted-foreground">{size.description}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            💡 Tip: If you're between sizes, we recommend going with the larger size for a more comfortable fit. 
            All our wigs feature adjustable straps for fine-tuning.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
