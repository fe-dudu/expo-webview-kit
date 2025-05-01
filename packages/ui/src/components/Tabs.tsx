import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col w-full', className)} {...props} />;
}

const tabListIndicatorVariants = cva('absolute bottom-0 h-0.75 transition-all duration-300 ease-in-out', {
  variants: {
    indicatorColor: {
      primary: 'bg-primary',
      black: 'bg-black',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    indicatorColor: 'primary',
  },
});

function TabsList({
  className,
  indicatorColor,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabListIndicatorVariants>) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (listRef.current) {
        const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement;
        if (activeTab) {
          const listRect = listRef.current.getBoundingClientRect();
          const activeRect = activeTab.getBoundingClientRect();

          setIndicator({
            left: activeRect.left - listRect.left,
            width: activeRect.width,
          });
        }
      }
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-state') {
          updateIndicator();
        }
      }
    });

    if (listRef.current) {
      observer.observe(listRef.current, {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-state'],
      });
    }

    return () => {
      window.removeEventListener('resize', updateIndicator);
      observer.disconnect();
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={listRef}
      className={cn('relative flex h-10 items-center border-b border-border text-muted-foreground', className)}
      {...props}
    >
      {props.children}
      <div
        className={tabListIndicatorVariants({ indicatorColor })}
        style={{
          left: `${indicator.left}px`,
          width: `${indicator.width}px`,
        }}
      />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-lg font-medium transition-all relative',
        'text-muted-foreground font-medium data-[state=active]:text-foreground data-[state=active]:font-bold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:text-foreground data-[state=active]:font-semibold',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
