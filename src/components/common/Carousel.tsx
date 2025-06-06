import React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of slide contents (JSX.Element)
  options?: EmblaOptionsType;
  showArrows?: boolean;
  showDots?: boolean;
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  slideClassName?: string; // Class for individual slide containers
  containerClassName?: string; // Class for the main carousel container
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  showArrows = true,
  showDots = true,
  autoplayOptions = { delay: 4000, stopOnInteraction: true },
  slideClassName,
  containerClassName,
}) => {
  const plugins = autoplayOptions ? [Autoplay(autoplayOptions)] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, plugins);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => {
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect(); // Set initial selected index
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit); // Also update on reInit
    onInit(); // Call onInit to set initial state

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
    };
  }, [emblaApi]);

  console.log("Rendering Carousel with slides:", slides.length, "Selected index:", selectedIndex);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className={cn("relative group", containerClassName)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              className={cn("flex-[0_0_100%] min-w-0", slideClassName)}
              key={index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === selectedIndex ? 'bg-primary w-4' : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;